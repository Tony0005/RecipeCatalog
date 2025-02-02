import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/RecipeCatalog/auth/token/', { email, password });
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.detail || 'Error durante el inicio de sesión');
        }
        throw new Error('Error durante el inicio de sesión');
      }
    },
    logout() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
});