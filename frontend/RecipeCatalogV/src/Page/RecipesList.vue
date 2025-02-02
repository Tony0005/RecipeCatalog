<template>
  <v-container>
    <h1 class="text-center mb-5">Mis Recetas</h1>
    <v-row class="filters mb-5" justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchQuery"
          label="Buscar por nombre"
          prepend-icon="mdi-magnify"
          @input="fetchRecipes"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filtrar por categoría"
          item-title="name"
          item-value="id"
          @change="fetchRecipes"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-center">
        <v-btn
          icon
          @click="toggleShowFavorites"
          :color="showFavorites ? 'orange' : 'grey'"
        >
          <v-icon>{{ showFavorites ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto mb-4" max-width="400">
          <v-img
            :src="recipe.image"
            height="200px"
          ></v-img>
          <v-card-title>{{ recipe.name }}</v-card-title>
          <v-card-subtitle>{{ getCategoryName(recipe.category) }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Dificultad:</strong> {{ recipe.difficulty }}</p>
            <p><strong>Tiempo de Preparación:</strong> {{ recipe.preparation_time }}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center">
            <v-btn icon @click="viewRecipe(recipe.id)" color="primary">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon @click="toggleFavorite(recipe.id)" :color="isFavorite(recipe.id) ? 'red' : 'grey'">
              <v-icon>{{ isFavorite(recipe.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
            <v-btn icon @click="editRecipe(recipe.id)" color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteRecipe(recipe.id)" color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="pageCount"
      @input="fetchRecipes"
      class="mt-5"
    ></v-pagination>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecipeService from '../API/RecipeServer';
import CategoryService from '../API/CategoryServer';

interface Recipe {
  id: number;
  name: string;
  difficulty: string;
  preparation_time: string;
  ingredients: string;
  steps: string;
  category: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

export default defineComponent({
  data() {
    return {
      recipes: [] as Recipe[],
      categories: [] as Category[],
      searchQuery: '',
      selectedCategory: null as number | null,
      showFavorites: false,
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as number[],
      page: 1,
      itemsPerPage: 6,
    };
  },
  async created() {
    await this.fetchCategories();
    await this.fetchRecipes();
  },
  computed: {
    filteredRecipes(): Recipe[] {
      const filtered = this.recipes.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? recipe.category === this.selectedCategory : true;
        const matchesFavorites = this.showFavorites ? this.isFavorite(recipe.id) : true;
        return matchesName && matchesCategory && matchesFavorites;
      });
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    pageCount(): number {
      const filtered = this.recipes.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? recipe.category === this.selectedCategory : true;
        const matchesFavorites = this.showFavorites ? this.isFavorite(recipe.id) : true;
        return matchesName && matchesCategory && matchesFavorites;
      });
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await CategoryService.getCategories();
        this.categories = response.data;
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    },
    async fetchRecipes() {
      try {
        const response = await RecipeService.getRecipes();
        this.recipes = response.data.map((recipe: any) => ({
          ...recipe,
          preparation_time: recipe.preparation_time.toString()
        }));
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
      }
    },
    editRecipe(id: number) {
      this.$router.push({ path: '/recipe_form', query: { id } });
    },
    async deleteRecipe(id: number) {
      try {
        await RecipeService.deleteRecipe(id);
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      } catch (error) {
        console.error('Error al eliminar la receta:', error);
      }
    },
    toggleFavorite(id: number) {
      if (this.isFavorite(id)) {
        this.favorites = this.favorites.filter(favId => favId !== id);
      } else {
        this.favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(id: number) {
      return this.favorites.includes(id);
    },
    viewRecipe(id: number) {
      this.$router.push({ path: '/recipe_detail', query: { id } });
    },
    getCategoryName(categoryId: number): string {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Desconocida';
    },
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;
      this.fetchRecipes();
    }
  }
});
</script>

<style scoped>
.recipe-card {
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.recipe-image {
  border-radius: 12px 12px 0 0;
  object-fit: cover;
}

.v-card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
