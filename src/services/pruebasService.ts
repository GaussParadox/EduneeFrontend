// services/pruebasService.ts
import axios from 'axios';
import { Prueba } from 'interfaces/prueba';

export const obtenerPruebasRecientes = async (
  token: string,
  pacienteId?: number
): Promise<Prueba[]> => {
  const endpoint = pacienteId
    ? `http://localhost:8000/api/pacientes/${pacienteId}/pruebas/recientes/`
    : 'http://localhost:8000/api/pruebas/recientes/';

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.map((p: any) => ({
    id: p.prueba_id,
    nombre: p.nombre_prueba,
    descripcion: p.descripcion,
    tipo: p.tipo_prueba || '',
  }));
};
