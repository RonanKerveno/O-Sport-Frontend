import React, { useState } from 'react';
import { format } from 'date-fns';
import { EditEventData, SportsListData, AddressApi } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import useAddressSearch from '@/hooks/useAddressSearch';
import AddressSearchModal from './AdressSearchModal';

type FormValues = EditEventData

interface EventEditFormProps {
  isEdit: boolean;
  eventData: EditEventData;
  sportsList: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (submittedData: EditEventData) => void;
}

export default function EventEditForm({
  isEdit, eventData, sportsList, onSubmit,
}: EventEditFormProps) {
  const defaultValues = {
    ...eventData,
    startingTime: eventData.startingTime ? format(new Date(eventData.startingTime), "yyyy-MM-dd'T'HH:mm") : '',
    endingTime: eventData.endingTime ? format(new Date(eventData.endingTime), "yyyy-MM-dd'T'HH:mm") : '',
  };
  const {
    handleSubmit, control, setValue, formState: { errors }, getValues,
  } = useForm<FormValues>({ defaultValues });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, addresses, errorAddress } = useAddressSearch(searchQuery);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const extractRegionFromContext = (context: string) => {
    // Sépare le contexte en utilisant la virgule comme séparateur
    const contextParts = context.split(',');
    return contextParts[contextParts.length - 1].trim();
  };

  const selectAddress = (address: AddressApi) => {
    // Mise à jour des valeurs de formulaire pour chaque champ d'adresse
    setValue('street', address.properties.name);
    setValue('zipCode', address.properties.postcode);
    setValue('city', address.properties.city);
    const region = extractRegionFromContext(address.properties.context);
    setValue('region', region);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">

        <div className="my-4">
          <label htmlFor="title" className="font-bold block">
            Titre
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="title"
                    className={`w-full px-2 py-1 border ${errors.title ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  />
                </div>
              )}
              rules={{ required: 'Le titre est obligatoire' }}
            />
            {errors.title && <div className="text-red-600">{errors.title.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="sport" className="font-bold block">
            Sport
            {!isEdit ? (
              <Controller
                name="sportId"
                control={control}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      id="sport"
                      className={`w-full px-2 py-1 border ${errors.sportId ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    >
                      <option value="">--Choisir un sport--</option>
                      {sportsList.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                rules={{ required: 'Le choix du sport est obligatoire' }}
              />
            ) : (
              <div className="ml-2">{eventData.sport && eventData.sport.name ? eventData.sport.name : 'sport inconnu'}</div>
            )}
            {errors.sportId && !isEdit && <div className="text-red-600">{errors.sportId.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="description" className="font-bold block">
            Description
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <textarea
                    {...field}
                    id="description"
                    className={`w-full px-2 py-1 border ${errors.description ? 'border-red-600' : 'border-gray-300'} rounded mt-1 resize-y font-normal`}
                  />
                </div>
              )}
              rules={{ required: 'La description est obligatoire' }}
            />
            {errors.description && <div className="text-red-600">{errors.description.message}</div>}
          </label>
        </div>

        <button type="button" onClick={openModal}>Rechercher une adresse</button>

        <div className="my-4">
          <label htmlFor="region" className="font-bold block">
            Région
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="region"
                    className={`w-full px-2 py-1 border ${errors.region ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    disabled={!errorAddress}
                  />
                </div>
              )}
              rules={{ required: 'La région est obligatoire' }}
            />
            {errors.region && <div className="text-red-600">{errors.region.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="zipCode" className="font-bold block">
            Code postal
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="zipCode"
                    className={`w-full px-2 py-1 border ${errors.zipCode ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    disabled={!errorAddress}
                  />
                </div>
              )}
              rules={{ required: 'Le code postal est obligatoire' }}
            />
            {errors.zipCode && <div className="text-red-600">{errors.zipCode.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="city" className="font-bold block">
            Ville
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="city"
                    className={`w-full px-2 py-1 border ${errors.city ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    disabled={!errorAddress}
                  />
                </div>
              )}
              rules={{ required: 'La ville est obligatoire' }}
            />
            {errors.city && <div className="text-red-600">{errors.city.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="street" className="font-bold block">
            Rue
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="street"
                    className={`w-full px-2 py-1 border ${errors.street ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    disabled={!errorAddress}
                  />
                </div>
              )}
              rules={{ required: 'La rue est obligatoire' }}
            />
            {errors.street && <div className="text-red-600">{errors.street.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="startingTime" className="font-bold block">
            Heure de début
            <Controller
              name="startingTime"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="startingTime"
                    type="datetime-local"
                    className={`w-full px-2 py-1 border ${errors.startingTime ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  />
                </div>
              )}
              rules={{ required: "L'heure de début est obligatoire" }}
            />
            {errors.startingTime && <div className="text-red-600">{errors.startingTime.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="endingTime" className="font-bold block">
            Heure de fin
            <Controller
              name="endingTime"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="endingTime"
                    type="datetime-local"
                    className={`w-full px-2 py-1 border ${errors.endingTime ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  />
                </div>
              )}
              rules={{
                required: "L'heure de fin est obligatoire",
                validate: (value) => value >= getValues('startingTime') || "L'heure de fin doit être postérieure à l'heure de début.",
              }}
            />
            {errors.endingTime && <div className="text-red-600">{errors.endingTime.message}</div>}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="maxNbParticipants" className="font-bold block">
            Nombre maximum de participants
            <Controller
              name="maxNbParticipants"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="maxNbParticipants"
                    type="number"
                    className={`w-full px-2 py-1 border ${errors.maxNbParticipants ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  />
                </div>
              )}
              rules={{
                required: 'Le nombre maximum de participants est obligatoire',
              }}

            />
            {errors.maxNbParticipants && <div className="text-red-600">{errors.maxNbParticipants.message}</div>}
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? 'Mettre à jour' : 'Créer'}
        </button>

      </form>
      <AddressSearchModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setSearchQuery={setSearchQuery}
        loading={loading}
        addresses={addresses}
        selectAddress={selectAddress}
        errorAddress={errorAddress}
      />
    </div>
  );
}
