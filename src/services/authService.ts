import axios from 'axios';

export const loginAdministrador = async (
  username: string,
  password: string,
  keepLoggedIn: boolean = false
) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', { username, password });

    const data = response.data;

    const userData = {
      id: data.administrador_id,
      name: data.username,
      token: data.access,
    };

    if (keepLoggedIn) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('refresh_token', data.refresh);
      sessionStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.detail || error.response.data?.error || 'Error de autenticación'
      );
    }
    throw error;
  }
};

export const loginCliente = async (
  username: string,
  password: string,
  keepLoggedIn: boolean = false
) => {
  return loginAdministrador(username, password, keepLoggedIn);
};
