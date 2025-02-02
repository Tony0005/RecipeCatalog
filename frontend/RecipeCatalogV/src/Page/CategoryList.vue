<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-center">
              <span class="headline">Categorías</span>
            </v-card-title>
            <v-card-text>
              <v-btn color="warning" @click="goToCategoryForm" class="mb-4">
                Crear Nueva Categoría
              </v-btn>
              <v-list>
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  class="mb-2"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="editCategory(category.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteCategory(category.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import CategoryService from '../API/CategoryServer';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const categories = ref([]);
      const router = useRouter();
  
      const fetchCategories = async () => {
        try {
          const response = await CategoryService.getCategories();
          categories.value = response.data;
        } catch (error) {
          console.error('Error al obtener las categorías:', error);
        }
      };
  
      const goToCategoryForm = () => {
        router.push('/Category_Form');
      };
  
      const editCategory = (id) => {
        router.push({ path: '/Category_Form', query: { id } });
      };
  
      const deleteCategory = async (id) => {
        try {
          await CategoryService.deleteCategory(id);
          fetchCategories();
        } catch (error) {
          console.error('Error al eliminar la categoría:', error);
        }
      };
  
      fetchCategories();
  
      return {
        categories,
        goToCategoryForm,
        editCategory,
        deleteCategory,
      };
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>