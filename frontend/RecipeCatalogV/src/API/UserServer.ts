import axios, { type AxiosResponse } from 'axios';

const API_URL = 'http://127.0.0.1:8000/RecipeCatalog/auth';

interface User {
  email: string;
  password: string;
  password2?: string;
  username?: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

class AuthService {
  async login(user: User): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.post<AuthResponse>(`${API_URL}/token/`, {
      email: user.email,
      password: user.password,
    });
    return response;
  }

  async register(user: User): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.post<AuthResponse>(`${API_URL}/register/`, {
      email: user.email,
      username: user.username,
      password: user.password,
      password2: user.password2,
    });
    return response;
  }
}

export default new AuthService();