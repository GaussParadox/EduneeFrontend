import axios from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Administrador {
  id: number;
  username: string;
  fecha_creacion: string;
}

export interface PacienteUser {
  id: number;
  username: string;
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  genero: string;
  fecha_registro: string;
}

export interface UsuariosPlataforma {
  administradores: Administrador[];
  pacientes: PacienteUser[];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const obtenerUsuarios = async (token: string): Promise<UsuariosPlataforma> => {
  const response = await axios.get(
    'http://localhost:8000/api/usuarios/gestion/',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};