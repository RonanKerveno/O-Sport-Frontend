// Hook personnalisé pour limiter le nombre de requêtes vers l'API de recherche d'adresse
// en définissant un délais entre la fin d'une saisie et la requête.

import { useState, useEffect } from 'react';

const useDebounce = (value: string): string => {
  // State gérant la valeur de la saisie après temporisation.
  const [debouncedValue, setDebouncedValue] = useState(value);

  // useEffect gérant les actions liées aux modification de la saisie d'adresse.
  useEffect(
    () => {
      // Définition du timer entre la fin d'une saisie et l'envoi de la requête.
      const handler = setTimeout(() => {
        // Vérification si la longueur de la chaîne est inférieure à 3 avant de charger une valeur
        // dans debouncedValue, sinon génère des erreurs CORS sur l'API.
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
