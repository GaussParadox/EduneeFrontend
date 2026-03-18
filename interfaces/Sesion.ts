export interface Paciente {
  paciente_id: number;
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  telefono: string;
  genero: string;
}
 
export interface Sesion {
  sesion_id: number;
  paciente: Paciente;
  prueba: string;
  tipo_prueba: string;
  categoria: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  estado: string;
  puntaje_total: number;
}