import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage
 * @param {string} key - Clave del localStorage
 * @param {T} initialValue - Valor inicial
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error al leer del localStorage:', error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
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
