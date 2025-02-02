<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-img
            :src="recipe?.image"
            height="300px"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{ recipe?.name }}</v-card-title>
            <v-card-subtitle>{{ recipe?.category !== undefined ? getCategoryName(recipe.category) : 'Desconocida' }}</v-card-subtitle>
          </v-img>
          <v-card-text>
            <p><strong>Dificultad:</strong> {{ (recipe?.difficulty) }}</p>
            <p><strong>Tiempo de Preparación:</strong> {{ (recipe?.preparation_time) }} minutos</p>
            <p><strong>Ingredientes:</strong></p>
            <ul>
              <li v-for="(ingredient, index) in recipe?.ingredients.split(',')" :key="index">{{ ingredient }}</li>
            </ul>
            <p><strong>Instrucciones:</strong></p>
            <p>{{ (recipe?.steps) }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click="goBack">Volver</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
  setup() {
    const recipe = ref<Recipe | null>(null);
    const categories = ref<Category[]>([]);
    const router = useRouter();
    const route = useRoute();

    const fetchRecipe = async (id: number) => {
      try {
        const response = await RecipeService.getRecipe(id);
        recipe.value = response.data as unknown as Recipe;
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        categories.value = response.data;
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const getCategoryName = (categoryId: number): string => {
      const category = categories.value.find(cat => cat.id === categoryId);
      return category ? category.name : 'Desconocida';
    };

    const goBack = () => {
      router.push('/Recipe_List');
    };

    onMounted(async () => {
      const recipeId = route.query.id;
      if (recipeId) {
        await fetchRecipe(Number(recipeId));
        await fetchCategories();
      }
    });

    return {
      recipe,
      getCategoryName,
      goBack,
    };
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>