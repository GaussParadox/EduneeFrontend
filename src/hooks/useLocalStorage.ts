import { useState } from 'react';

// GUíA 8: Actividad 1 - Lectura/Escritura de Archivos Planos
// Hook personalizado React para manejar localStorage de manera reactiva
// Interfaz localStorage: Lee y escribe datos persistentes en el navegador
// JSON.parse/stringify: Serializa objetos complejos para almacenamiento en texto plano
// Control de excepciones (I/O Errors): Bloques try/catch en lectura y escritura
// Manejo seguro de permisos: Valida acceso a window.localStorage con try/catch
// Mensajes de error: Console.error con template strings para debugging
// Genéricos TypeScript: Tipo T permite reutilizar para cualquier estructura de datos
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
      // GUíA 8: Actividad 1 - Lectura de datos persistentes
      // Intenta recuperar valor del localStorage usando la clave proporcionada
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // GUíA 8: Actividad 3 - Control de Excepciones para I/O Errors
      // Manejo seguro de excepciones al acceder a localStorage o parsear JSON
      // Mensaje amigable para debugging sin interrumpir la aplicación
      console.error('Error al leer del localStorage:', error);
      return initialValue;
    }
  });

  // GUíA 8: Actividad 1 - Escritura de datos persistentes
  // Función para actualizar y persistir el valor en localStorage
  // Manejo de callbacks: Soporta tanto valores directos como actualizadores funcionales
  // Sincronización estado-storage: Mantiene consistencia entre React state y localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite actualizar con valor directo o con función (como setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // GUíA 8: Actividad 1 - Persistencia mediante localStorage
      // Serializa el valor a JSON string antes de almacenar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // GUíA 8: Actividad 3 - Manejo de excepciones de escritura
      // Captura errores de quota exceeded, permisos denegados, etc.
      // Notifica al usuario sin romper el flujo de la aplicación
      console.error('Error al guardar en localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
