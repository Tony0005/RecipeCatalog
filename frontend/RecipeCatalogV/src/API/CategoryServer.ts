import axios, { type AxiosResponse } from 'axios';
import { useAuthStore } from '../store/auth';

const API_URL = 'http://127.0.0.1:8000/RecipeCatalog/category';

interface Category {
    id: number;
    name: string;
}

class CategoryService {
    async getCategories(): Promise<AxiosResponse<Category[]>> {
        const authStore = useAuthStore();
        return axios.get<Category[]>(`${API_URL}/`,{
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });
    }

    async getCategory(id: number): Promise<AxiosResponse<Category>> {
        const authStore = useAuthStore();
        return axios.get<Category>(`${API_URL}/${id}/`,{
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });
    }

    async createCategory(category: Category): Promise<AxiosResponse<Category>> {
        const authStore = useAuthStore();
        return axios.post<Category>(`${API_URL}/`, category,{
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });
    }

    async updateCategory(category: Category): Promise<AxiosResponse<Category>> {
        const authStore = useAuthStore();
        return axios.put<Category>(`${API_URL}/${category.id}/`, category,{
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });
    }

    async deleteCategory(id: number): Promise<AxiosResponse<Category>> {
        const authStore = useAuthStore();
        return axios.delete<Category>(`${API_URL}/${id}/`,{
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`,
            },
        });
    }
}

export default new CategoryService();