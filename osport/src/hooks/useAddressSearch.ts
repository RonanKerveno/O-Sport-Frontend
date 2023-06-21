import { AddressApi } from '@/types';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useAddressSearch = (query: string): {
   loading: boolean, addresses: AddressApi[], errorAddress: string | null } => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [errorAddress, setErrorAdress] = useState<string | null>(null);

  useEffect(() => {
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
