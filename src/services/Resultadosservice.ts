import axios from 'axios';
import { Sesion } from 'interfaces/sesion';
export const obtenerResultados = async (token: string): Promise<Sesion[]> => {
  const response = await axios.get(
    'http://localhost:8000/api/pruebas/resultados/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
 
  return response.data;
};
 