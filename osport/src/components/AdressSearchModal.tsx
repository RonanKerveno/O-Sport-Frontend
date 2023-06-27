// Composant d'affichage de recherche prédictive d'adresse.

import useDebounce from '@/hooks/useDebounce';
import { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AddressApi } from '../types';

// Typage des props
interface AddressSearchModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (query: string) => void;
  loading: boolean;
  addresses: AddressApi[];
  // eslint-disable-next-line no-unused-vars
  selectAddress: (address: AddressApi) => void;
  errorAddress: string | null;
}

function AddressSearchModal({
  modalIsOpen, closeModal, setSearchQuery, loading, addresses, selectAddress, errorAddress,
}: AddressSearchModalProps) {
  // État pour la valeur de l'input
  const [inputValue, setInputValue] = useState('');
  // Appel au hook useDebounce pour limiter les requêtes pendant la saisie.
  const debouncedSearchTerm = useDebounce(inputValue);

  // useEffect gérant la mise à jour de la requête de recherche.
  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  // Fonction gérant la mise à jour de la valeur d'input pendant la saisie.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Recherche d'adresse"
      className="flex flex-col items-center justify-center bg-slate-300 text-black p-8 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Entrez votre adresse</h2>
      <p className="mb-4 font-medium text-center">Puis séléctionnez la bonne correspondance</p>
      <input
        value={inputValue}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {errorAddress && (
        <div className="mt-4 text-red-600">{errorAddress}</div>
      )}
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="mt-4">
          {addresses.map((address) => (
            <button
              type="button"
              key={address.properties.id}
              onClick={() => selectAddress(address)}
              className="cursor-pointer hover:bg-blue-200 p-3 rounded text-slate-900"
            >
              {address.properties.label}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default AddressSearchModal;
