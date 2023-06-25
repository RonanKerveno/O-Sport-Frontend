import React, { useState } from 'react';
import { format } from 'date-fns';
import { EditEventData, SportsListData, AddressApi } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import useAddressSearch from '@/hooks/useAddressSearch';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import Select from 'react-select';
import AddressSearchModal from './AdressSearchModal';

// Typages

type FormValues = EditEventData
// Typage des props
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

  // Définition des propriétés de React Hook Form pour le contrôle du formulaire.
  const {
    handleSubmit, control, setValue, formState: { errors }, getValues,
  } = useForm<FormValues>({ defaultValues });

  // Recherche prédictive d'adresse (via API Adresse)

  // State gérant la saisie d'adresse à envoyer dans la requête API.
  const [searchQuery, setSearchQuery] = useState('');

  // Appel au Hook personnalisé qui va déclencher et gérer les requêtes vers l'API.
  const { loading, addresses, errorAddress } = useAddressSearch(searchQuery);

  // State gérant l'état de la modale de recherche prédictive d'adresse.
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fonction liée au clic sur le bouton de recherche d'adresse.
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Fonction liée aux demande de fermeture de la modale de recherche prédictive d'adresse.
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // L'API Adresse utilisée retourne une propriété "context" qui contient le n° de département,
  // le nom de département et le nom de région. Il faut donc extraire le nom de région.
  const extractRegionFromContext = (context: string) => {
    // Sépare le contexte en utilisant la virgule comme séparateur
    const contextParts = context.split(',');
    return contextParts[contextParts.length - 1].trim();
  };

  // Fonction de mise à jour des valeurs de formulaire pour chaque champ d'adresse, à partir
  // de l'adresse séléctionnée dans les réponses de l'API Adresse.
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
    // Formulaire de création ou modification d'événement utilisant react-hook-form.
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="my-7">
          <label htmlFor="title" className="font-bold">
            Titre <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="sport" className="font-bold">
            Sport <span className="text-sm font-medium">(*Obligatoire)</span>
            {!isEdit ? (
              <Controller
                name="sportId"
                control={control}
                render={({ field }) => {
                  const options = sportsList.map((sport) => {
                    const SportIcon = sportIconMap[sportNameConvert(sport.name)]
                      || sportIconMap.Sports;
                    return {
                      value: sport.id,
                      label: (
                        <div className="flex items-center gap-2">
                          <SportIcon size={22} />
                          <div>{sport.name}</div>
                        </div>
                      ),
                    };
                  });

                  const onChange = (option: any) => {
                    if (option && option instanceof Array) {
                      const selectedValues = option.map((value: any) => value.value);
                      setValue('sportId', selectedValues.join(','));
                    } else if (option) {
                      setValue('sportId', option.value);
                    } else {
                      setValue('sportId', '');
                    }
                  };

                  return (
                    <Select
                      {...field}
                      id="sport"
                      placeholder="Sélectionnez un sport"
                      className={`w-full ${errors.sportId && 'border border-red-600'} rounded mt-1 font-normal`}
                      options={options}
                      onChange={onChange}
                      value={options.find((option) => option.value === field.value)}
                    />
                  );
                }}
                rules={{ required: 'Le choix du sport est obligatoire' }}
              />
            ) : (
              <>
                {(() => {
                  const SportIcon = sportIconMap[sportNameConvert(eventData.sport.name)]
                    || sportIconMap.Sports;
                  return (
                    <div className="text-orange-900 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <SportIcon size={22} />
                        <div>{eventData.sport && eventData.sport.name ? eventData.sport.name : 'sport inconnu'}</div>
                      </div>
                      <p className="text-sm">*Sport non modifiable sur un profil existant</p>
                    </div>
                  );
                })()}
              </>
            )}
            {errors.sportId && !isEdit && <div className="text-red-600">{errors.sportId.message}</div>}
          </label>
        </div>

        <div className="my-7">
          <label htmlFor="description" className="font-bold">
            Description <span className="text-sm font-medium">(*Obligatoire)</span>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <textarea
                    {...field}
                    id="description"
                    className={`w-full h-40 px-2 py-1 border ${errors.description ? 'border-red-600' : 'border-gray-300'} rounded mt-1 resize-y font-normal`}
                  />
                </div>
              )}
              rules={{ required: 'La description est obligatoire' }}
            />
            {errors.description && <div className="text-red-600">{errors.description.message}</div>}
          </label>
        </div>

        <div className="my-7">
          <label htmlFor="startingTime" className="font-bold">
            Heure de début <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="endingTime" className="font-bold">
            Heure de fin <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="maxNbParticipants" className="font-bold">
            Participants maximum <span className="text-sm font-medium">(*Obligatoire)</span>
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
          type="button"
          onClick={openModal}
          className="bg-slate-700 text-white py-2 px-4 rounded-md mt-4 mb-4"
        >
          Rechercher l&#39;adresse
        </button>
        <p className="font-medium">*Utilisez ce bouton de recherche pour compléter les champs obligatoires ci-dessous.</p>

        <div className="my-7">
          <label htmlFor="region" className="font-bold">
            Région <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="zipCode" className="font-bold">
            Code postal <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="city" className="font-bold">
            Ville <span className="text-sm font-medium">(*Obligatoire)</span>
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

        <div className="my-7">
          <label htmlFor="street" className="font-bold">
            Rue <span className="text-sm font-medium">(*Obligatoire)</span>
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#264b81] text-lg text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>

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
