import useDebounce from '@/hooks/useDebounce';
import { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AddressApi } from '../types';

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
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue);

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Recherche d'adresse"
      className="flex flex-col items-center justify-center bg-slate-200 text-black p-8 rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Recherche d&#39;adresse</h2>
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
              className="cursor-pointer hover:bg-blue-200 p-2 rounded text-left"
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