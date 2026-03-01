import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage
 * @param {string} key - Clave del localStorage
 * @param {any} initialValue - Valor inicial
 */
const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
    const [storedValue, setStoredValue] = useState(() => {
        try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
        } catch (error) {
        console.error('Error al leer del localStorage:', error);
        return initialValue;
        }
    });

  // Función para actualizar el valor
    const setValue = (value) => {
        try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
