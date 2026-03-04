// services/pruebasService.ts
import axios from 'axios';
import { Prueba } from 'interfaces/prueba';

export const obtenerPruebasRecientes = async (token: string): Promise<Prueba[]> => {
  const response = await axios.get(
    'http://localhost:8000/api/pruebas/recientes/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.map((p: any) => ({
    id: p.prueba_id,
    nombre: p.nombre_prueba,
    descripcion: p.descripcion,
    tipo: p.tipo_prueba || '', 
  }));
};
