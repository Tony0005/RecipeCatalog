import axios, { type AxiosResponse } from 'axios';
import { useAuthStore } from '../store/auth';

const API_URL = 'http://127.0.0.1:8000/RecipeCatalog/recipe';

interface Recipe {
  id: number;
  user: number;
  name: string;
  difficulty: string;
  preparation_time: Date;
  ingredients: string;
  steps: string;
  category: string;
}

class RecipeService {
  async getRecipes(): Promise<AxiosResponse<Recipe[]>> {
    const authStore = useAuthStore();
    return axios.get<Recipe[]>(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
  }

  async getRecipe(id: number): Promise<AxiosResponse<Recipe>> {
    const authStore = useAuthStore();
    return axios.get<Recipe>(`${API_URL}/${id}/`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
  }

  async createRecipe(recipe: Recipe): Promise<AxiosResponse<Recipe>> {
    const authStore = useAuthStore();
    return axios.post<Recipe>(`${API_URL}/`, recipe, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
  }

  async updateRecipe(id: number, recipe: FormData): Promise<AxiosResponse<Recipe>> {
    const authStore = useAuthStore();
    return axios.put<Recipe>(`${API_URL}/${id}/`, recipe, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteRecipe(id: number): Promise<AxiosResponse<Recipe>> {
    const authStore = useAuthStore();
    return axios.delete<Recipe>(`${API_URL}/${id}/`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
  }
}

export default new RecipeService();