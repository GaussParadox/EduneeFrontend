import api from './api';

// Tipos para el servicio de autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

/**
 * Servicio de ejemplo para autenticación
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registrar nuevo usuario
   * @param {Object} userData - { name, email, password }
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * Obtener perfil del usuario actual
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/auth/profile');
    return response.data;
  },

  /**
   * Actualizar perfil
   * @param {Object} profileData - Datos del perfil a actualizar
   */
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/auth/profile', profileData);
    return response.data;
  },
};

export default authService;
