import axios from 'axios';

export const loginAdministrador = async (
  usuario: string,
  contrasena: string,
  keepLoggedIn: boolean = false
) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/login/',
      { usuario, contrasena }
    );

    const data = response.data;

    
    if (keepLoggedIn) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
    } else {
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('refresh_token', data.refresh);
    }

    return data; 
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.detail || 
        error.response.data?.error || 
        'Error de autenticación'
      );
    }
    throw error;
  }
};