<template>
  <v-app-bar app color="orange" dark>
    <v-toolbar-title color="white" >Catálogo de Recetas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="link in navigationLinks"
      :key="link.path"
      :to="link.path"
      text
      color="white"
      class="mx-2"
    >
      {{ link.label }}
    </v-btn>
    <v-btn
      v-if="isAuthenticated"
      @click="logout"
      to="/"
      icon
      class="ml-2"
      color="white"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-btn
      v-else
      to="/Login"
      icon
      color="white"
      class="ml-2"
    >
    <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '../store/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const logout = () => {
      authStore.logout();
    };

    return {
      isAuthenticated,
      logout,
      navigationLinks: [
        { label: 'Inicio', path: '/' },
        { label: 'Crear Receta', path: '/Recipe_Form' },
        { label: 'Lista de Recetas', path: '/Recipe_List' },
        { label: 'Categorías de Platos', path: '/Category_List' },
      ],
    };
  },
});
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>