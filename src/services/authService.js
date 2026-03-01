import api from "./api";

/**
 * Servicio de ejemplo para autenticación
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  /**
   * Registrar nuevo usuario
   * @param {Object} userData - { name, email, password }
   */
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  /**
   * Obtener perfil del usuario actual
   */
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  /**
   * Actualizar perfil
   * @param {Object} profileData - Datos del perfil a actualizar
   */
  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile", profileData);
    return response.data;
  },
};

export default authService;
