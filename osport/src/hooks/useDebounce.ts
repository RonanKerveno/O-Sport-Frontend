import { useState, useEffect } from 'react';

const useDebounce = (value: string): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        // Vérifier si la longueur de la chaîne est inférieure à 3
        if (value.trim().length < 3) {
          setDebouncedValue('');
        } else {
          setDebouncedValue(value);
        }
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );

  return debouncedValue;
};

export default useDebounce;
