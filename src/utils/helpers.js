    /**
     * Formatea una fecha a un formato legible
     * @param {Date|string} date - Fecha a formatear
     * @param {string} locale - Locale (default: 'es-ES')
     */
    export const formatDate = (date, locale = 'es-ES') => {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    };

    /**
     * Trunca un texto a una longitud específica
     * @param {string} text - Texto a truncar
     * @param {number} maxLength - Longitud máxima
     */
    export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
    };

    /**
     * Valida un email
     * @param {string} email - Email a validar
     */
    export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    };

    /**
     * Capitaliza la primera letra de un string
     * @param {string} str - String a capitalizar
     */
    export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    /**
     * Debounce function para optimizar llamadas
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     */
    export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
        clearTimeout(timeout);
        func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
    };
