    // Constantes de la aplicación
    export const APP_NAME = 'Edunee';
    export const APP_VERSION = '1.0.0';

    // Rutas de la aplicación
    export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    };

    // Estados
    export const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    };

    // Mensajes
    export const MESSAGES = {
    ERROR: {
        GENERIC: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
        NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
        AUTH: 'No estás autorizado para realizar esta acción.',
    },
    SUCCESS: {
        SAVE: 'Guardado exitosamente',
        UPDATE: 'Actualizado exitosamente',
        DELETE: 'Eliminado exitosamente',
    },
    };
