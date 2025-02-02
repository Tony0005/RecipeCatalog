<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="text-center">
              <span class="headline">{{ isEditMode ? 'Editar Categoría' : 'Crear Categoría' }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                  label="Nombre de la Categoría"
                  v-model="category.name"
                  :rules="[rules.required]"
                  prepend-icon="mdi-tag"
                  outlined
                  dense
                  required
                ></v-text-field>
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
  import CategoryService from '../API/CategoryServer';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const category = ref({
        id: null,
        name: '',
      });
      const isEditMode = ref(false);
      const valid = ref(false);
      const form = ref(null);
      const router = useRouter();
  
      const rules = {
        required: value => !!value || 'Este campo es obligatorio',
      };
  
      const fetchCategory = async (categoryId) => {
        try {
          const categoryResponse = await CategoryService.getCategory(categoryId);
          category.value = categoryResponse.data;
        } catch (error) {
          console.error('Error al obtener la categoría:', error);
        }
      };
  
      const submitForm = async () => {
        if (form.value && form.value.validate()) {
          try {
            if (isEditMode.value) {
              await CategoryService.updateCategory(category.value);
            } else {
              await CategoryService.createCategory(category.value);
            }
            router.push('/Category_List');
          } catch (error) {
            console.error('Error al guardar la categoría:', error);
          }
        }
      };
  
      const resetForm = () => {
        category.value = {
          id: null,
          name: '',
        };
        isEditMode.value = false;
      };
  
      const init = async () => {
        const categoryId = router.currentRoute.value.query.id;
        if (categoryId) {
          isEditMode.value = true;
          await fetchCategory(categoryId);
        }
      };
  
      init();
  
      return {
        category,
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