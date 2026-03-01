import { apiFetch } from './api';

export const loginAdministrador = async (
  usuario: string,
  contrasena: string
) => {
  return await apiFetch('/login/', {
    method: 'POST',
    body: JSON.stringify({ usuario, contrasena }),
  });
};

