// Hook personnalisé pour gérer la recherche d'adresse prédictive via des requêtes sur l'API
// du gouvernement.

import { AddressApi } from '@/types';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useAddressSearch = (query: string): {
   loading: boolean, addresses: AddressApi[], errorAddress: string | null } => {
  // State gérant l'état de chargement lors de l'attente de la réponse à la requête
  const [loading, setLoading] = useState(false);
  // State gérant les données d'adresse récupérées par la requête
  const [addresses, setAddresses] = useState([]);
  // State gérant l'état des erreurs de requête.
  const [errorAddress, setErrorAdress] = useState<string | null>(null);

  // useEffect gérant les requêtes vers API déclenchées par les modifications de la saisie.
  useEffect(() => {
    // Fonction asynchrone de requête vers l'API.
    const search = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
        setAddresses(response.data.features);
        setErrorAdress(null);
      } catch (err) {
        setErrorAdress('La récupération des adresses a échoué');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      search();
    } else {
      setAddresses([]);
    }
  }, [query]);

  return { loading, addresses, errorAddress };
};

export default useAddressSearch;
