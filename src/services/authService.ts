import axios from 'axios';

// GU\u00cdA 8: Actividad 1 - Lectura/Escritura de Archivos Planos & Actividad 3 - Control de Excepciones
// Funci\u00f3n para autenticaci\u00f3n de administradores con persistencia de sesión
// Manejo de localStorage y sessionStorage: Almacena tokens de acceso y datos de usuario seg\u00fan opci\u00f3n keepLoggedIn\n// Control de excepciones (I/O Errors): Bloque try/catch para manejo de errores de autenticaci\u00f3n\n// JSON.stringify: Serializa objeto userData para persistencia en almacenamiento local\n// Manejo de permisos: Verifica credenciales en servidor API antes de permitir persistencia\n// Mensajes amigables: Template strings en errores con datos del servidor\nexport const loginAdministrador = async (\n  username: string,\n  password: string,\n  keepLoggedIn: boolean = false\n) => {\n  try {\n    const response = await axios.post('http://localhost:8000/api/login/', { username, password });

    const data = response.data;

    const userData = {
  id:    data.administrador_id,
  name:  data.username,
  token: data.access,
  rol:   'admin' as const,
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
  } catch (error: any) {\n    if (error.response) {\n      throw new Error(\n        error.response.data?.detail || error.response.data?.error || 'Error de autenticación'\n      );\n    }\n    throw error;\n  }\n};\n\n// GU\u00cdA 8: Actividad 1 - Lectura/Escritura de Archivos Planos\n// Funci\u00f3n para autenticaci\u00f3n de clientes/pacientes\n// Reutiliza l\u00f3gica: Delega a loginAdministrador manteniendo mismo flujo de persistencia\n// Manejo de sessionStorage/localStorage: Hereda comportamiento de persistencia de la funci\u00f3n base\n// Consistencia: Utiliza los mismos par\u00e1metros y manejo de excepciones\nexport const loginCliente = async (\n  username: string,\n  password: string,\n  keepLoggedIn: boolean = false\n) => {\n  return loginAdministrador(username, password, keepLoggedIn);\n};
