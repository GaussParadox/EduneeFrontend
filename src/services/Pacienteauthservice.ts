import axios from 'axios';
import { PacienteSession } from '../context/Pacienteauthcontext';
 
const BASE_URL = 'http://localhost:8000/api/pacientes';
 
// ─── Login ────────────────────────────────────────────────────────────────────
 
export const loginPaciente = async (
  username: string,
  password: string
): Promise<PacienteSession> => {
  const response = await axios.post(`${BASE_URL}/login/`, { username, password });
  return response.data;
};
 
// ─── Registro ─────────────────────────────────────────────────────────────────
 
export interface RegistroPayload {
  nombres: string;
  apellidos: string;
  numeroIdentificacion: string;
  genero: string;
  username: string;
  password: string;
  confirmPassword: string;
}
 
export const registrarPaciente = async (payload: RegistroPayload): Promise<void> => {
  await axios.post(`${BASE_URL}/registro/`, payload);
};
 