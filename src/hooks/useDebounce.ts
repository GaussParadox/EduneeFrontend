import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * Útil para búsquedas, validaciones, etc.
 * @param {T} value - Valor a debounce
 * @param {number} delay - Retraso en milisegundos
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
