// services/pruebasService.ts
import axios from 'axios';

export const obtenerPruebasRecientes = async (token: string) => {
  const response = await axios.get(
    'http://localhost:8000/api/pruebas/recientes/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};