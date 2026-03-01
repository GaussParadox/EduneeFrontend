import { useState, useEffect } from "react";

/**
 * Hook para debounce de valores
 * Útil para búsquedas, validaciones, etc.
 * @param {any} value - Valor a debounce
 * @param {number} delay - Retraso en milisegundos
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
