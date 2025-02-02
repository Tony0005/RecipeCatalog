<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-center">
            <span class="headline">{{ isEditMode ? 'Editar Receta' : 'Agregar Nueva Receta' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <v-text-field
                label="Nombre De La Receta"
                v-model="recipe.name"
                :rules="[rules.required]"
                prepend-icon="mdi-food"
                outlined
                dense
                required
              ></v-text-field>
              <v-select
                :items="difficulties"
                label="Dificultad"
                v-model="recipe.difficulty"
                :rules="[rules.required]"
                prepend-icon="mdi-chart-bar"
                outlined
                dense
                required
              ></v-select>
              <v-textarea
                label="Ingredientes"
                v-model="recipe.ingredients"
                :rules="[rules.required]"
                prepend-icon="mdi-format-list-bulleted"
                outlined
                dense
                required
              ></v-textarea>
              <v-textarea
                label="Instrucciones"
                v-model="recipe.steps"
                :rules="[rules.required]"
                prepend-icon="mdi-book-open"
                outlined
                dense
                required
              ></v-textarea>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Horas"
                    v-model.number="preparationTime.hours"
                    type="number"
                    min="0"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Minutos"
                    v-model.number="preparationTime.minutes"
                    type="number"
                    min="0"
                    max="59"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Segundos"
                    v-model.number="preparationTime.seconds"
                    type="number"
                    min="0"
                    max="59"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-file-input
                label="Imagen de la Receta"
                v-model="recipe.image"
                prepend-icon="mdi-image"
                outlined
                dense
                accept="image/*"
                required
              ></v-file-input>
              <v-select
                :items="categories"
                label="Categoría"
                item-title="name"
                item-value="id"
                v-model="recipe.category"
                :rules="[rules.required]"
                prepend-icon="mdi-tag"
                outlined
                dense
                required
              ></v-select>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="warning" type="submit" :disabled="!valid">{{ isEditMode ? 'Actualizar' : 'Guardar' }}</v-btn>
                <v-btn color="warning" @click="resetForm">Cancelar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeService from '../API/RecipeServer';
import CategoryService from '../API/CategoryServer';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const recipe = ref({
      id: null,
      name: '',
      difficulty: '',
      ingredients: '',
      steps: '',
      preparation_time: '00:00:00',
      category: null,
      image: null,  
    });
    const preparationTime = ref({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const difficulties = ref(['fácil', 'regular', 'dificil']);
    const categories = ref([]);
    const isEditMode = ref(false);
    const valid = ref(false);
    const form = ref(null);
    const router = useRouter();

    const rules = {
      required: value => !!value || 'Este campo es obligatorio',
    };

    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        categories.value = response.data;
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const fetchRecipe = async (recipeId) => {
      try {
        const recipeResponse = await RecipeService.getRecipe(recipeId);
        recipe.value = recipeResponse.data;
        const [hours, minutes, seconds] = recipe.value.preparation_time.split(':').map(Number);
        preparationTime.value = { hours, minutes, seconds };
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    const submitForm = async () => {
      if (form.value && form.value.validate()) {
        try {
          recipe.value.preparation_time = `${String(preparationTime.value.hours).padStart(2, '0')}:${String(preparationTime.value.minutes).padStart(2, '0')}:${String(preparationTime.value.seconds).padStart(2, '0')}`;
          const formData = new FormData();
          for (const key in recipe.value) {
            formData.append(key, recipe.value[key]);
          }
          if (isEditMode.value) {
            await RecipeService.updateRecipe(recipe.value.id, formData);
          } else {
            await RecipeService.createRecipe(formData);
          }
          router.push('/Recipe_List');
        } catch (error) {
          console.error('Error al guardar la receta:', error);
        }
      }
    };

    const resetForm = () => {
      recipe.value = {
        id: null,
        name: '',
        difficulty: '',
        ingredients: '',
        steps: '',
        preparation_time: '00:00:00',
        category: null,
        image: null,
      };
      preparationTime.value = { hours: 0, minutes: 0, seconds: 0 };
      isEditMode.value = false;
    };

    const init = async () => {
      await fetchCategories();
      const recipeId = router.currentRoute.value.query.id;
      if (recipeId) {
        isEditMode.value = true;
        await fetchRecipe(recipeId);
      }
    };

    init();

    return {
      recipe,
      preparationTime,
      difficulties,
      categories,
      isEditMode,
      valid,
      form,
      rules,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>