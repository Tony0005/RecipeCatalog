import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Page/Home.vue';
import Login from '../Page/Login.vue';
import Register from '../Page/Register.vue';
import RecipeList from '../Page/RecipesList.vue';
import RecipeForm from '../Page/RecipeForm.vue';
import CategoryForm from '../Page/CategoryForm.vue';
import CategoryList from '../Page/CategoryList.vue';
import { useAuthStore } from '../store/auth';
import RecipeDetail from '../components/RecipeDetail.vue';
import type { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/recipe_list', 
    component: RecipeList,
    meta: { requiresAuth: true },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { 
    path: '/recipe_detail', 
    component: RecipeDetail,
    meta: { requiresAuth: true },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { 
    path: '/recipe_form', 
    component: RecipeForm,
    meta: { requiresAuth: true },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { 
    path: '/category_form', 
    component: CategoryForm,
    meta: { requiresAuth: true },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { 
    path: '/category_list', 
    component: CategoryList,
    meta: { requiresAuth: true },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;