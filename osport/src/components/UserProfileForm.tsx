// Composant de formulaire de profil utilisateur

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CgScrollV } from 'react-icons/cg';
import { getUserByIdPrivate } from '@/services/userService';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import useAddressSearch from '../hooks/useAddressSearch';
import UserTextFieldForm from './UserTextFieldForm';
import AddressSearchModal from './AdressSearchModal';
import {
  UserPublicData, UserPrivateData, SportsListData, AddressApi,
} from '../types';

// Typages

type FormValues = UserPublicData & UserPrivateData & { password: string; confirmPassword: string; };
type SubmittedData = Omit<FormValues, 'confirmPassword'>;
// Typage des props
interface UserProfileFormProps {
  isEdit: boolean;
  userData: UserPublicData;
  sportsList: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (submittedData: SubmittedData) => void;
}

// Initialisation par défaut des valeurs des données privées car ces dernières
// seront requêtées coté client (pas d'ccès au cookie httponly/secure en SSR).
const nullUserPrivateData = {
  email: '',
  firstName: '',
  password: '',
  confirmPassword: '',
  lastName: '',
  zipCode: '',
  street: '',
};

export default function UserProfileForm({
  isEdit, userData, sportsList, onSubmit,
}: UserProfileFormProps) {
  // State gérant les changements d'état de mot de passe via l'input.
  const [changePassword, setChangePassword] = useState(!isEdit);

  // State gérant les données privées de l'utilisateur.
  const [userPrivateData, setUserPrivateData] = useState<UserPrivateData | null>(null);

  // Définition des propriétés de React Hook Form pour le contrôle du formulaire.
  const {
    handleSubmit, control, setValue, setError, formState: { errors }, watch, reset,
  } = useForm<FormValues>({ defaultValues: { ...userData, ...userPrivateData } });

  // useEffect gérant la définition des données privées de l'utilisateur
  useEffect(() => {
    const fetchPrivateData = async () => {
      let updatedDefaultValues;

      // Si on est dans une modification (vs création) on recupère les données privées par défaut.
      if (isEdit) {
        // Appel API pour la récupération des données privées.
        const response = await getUserByIdPrivate(userData.id);
        if (response.success) {
          setUserPrivateData(response.userPrivate);
          // Mise à jour des valeurs par défaut
          updatedDefaultValues = { ...userData, ...response.userPrivate };
          // Si changePassword est false on vide les champs de mots de passe pour ne pas
          // qu'il soient enregistrés.
          if (!changePassword) {
            updatedDefaultValues.password = '';
            updatedDefaultValues.confirmPassword = '';
          }
          reset(updatedDefaultValues);
        }
        // Si on est dans une création de profil on charge les données à blanc
      } else {
        setUserPrivateData(nullUserPrivateData);
        updatedDefaultValues = { ...userData, ...nullUserPrivateData };
        // Si changePassword est false on vide les champs de mots de passe pour ne pas
        // qu'il soient enregistrés.
        if (!changePassword) {
          updatedDefaultValues.password = '';
          updatedDefaultValues.confirmPassword = '';
        }
        reset(updatedDefaultValues);
      }
    };
    fetchPrivateData();
  }, [userData.id, userData, reset, changePassword, isEdit]);

  // Surveillance des sports séléctionnés via les cases à cocher.
  const favoriteSports = watch('favoriteSports');

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
    setValue('street', address.properties.name);
    setValue('zipCode', address.properties.postcode);
    setValue('city', address.properties.city);
    const region = extractRegionFromContext(address.properties.context);
    setValue('region', region);
    closeModal();
  };

  // On attend que les données privées soient récupérées avant le render
  if (!userPrivateData) {
    return null;
  }

  return (
    // Formulaire de création ou modification de profil utilisant react-hook-form et le composant
    // UserTextFieldForm pour les types d'inputs les plus répétés.
    <div className="bg-slate-200 px-4 py-7 rounded-md shadow-md">
      <form
        onSubmit={handleSubmit((data) => {
          const { confirmPassword, ...submittedData } = data;
          // On vérifie si le nombre de sports sélectionnés est entre 1 et 5
          if (favoriteSports.length < 1 || favoriteSports.length > 5) {
            setError('favoriteSports', {
              type: 'manual',
              message: 'Vous devez sélectionner entre 1 et 5 sports',
            });
          } else {
            // si c'est correct on envoi la soumission du formulaire
            onSubmit(submittedData as SubmittedData);
          }
        })}
      >

        <div className="md:grid md:grid-cols-2 md:gap-7 mb-7">
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="userName"
              label="Nom d'utilisateur"
              rules={{ required: 'Nom d\'utilisateur est obligatoire' }}
              error={errors.userName}
            />
          </div>
          <div>
            <UserTextFieldForm
              control={control}
              name="email"
              label="Email"
              type="email"
              rules={{ required: 'Email est obligatoire' }}
              error={errors.email}
            />
          </div>
        </div>
        {/* Vérification du mot de passe par un champ de confirmation */}
        {isEdit && (
          <div className="mb-5">
            <label htmlFor="changePassword" className="font-bold">
              Modifier le mot de passe
              <input
                id="changePassword"
                type="checkbox"
                checked={changePassword}
                onChange={() => {
                  setChangePassword(!changePassword);
                  if (changePassword) {
                    setValue('password', '', { shouldValidate: true });
                    setValue('confirmPassword', '', { shouldValidate: true });
                  }
                }}
                className="ml-7"
              />
            </label>
          </div>
        )}
        {(!isEdit || changePassword) && (
          <div className="md:grid md:grid-cols-2 md:gap-7 mb-7">
            <div className="mb-4 md:mb-0">
              <UserTextFieldForm
                control={control}
                name="password"
                label={isEdit ? 'Nouveau mot de passe' : 'Mot de passe'}
                type="password"
                rules={{
                  required: changePassword ? 'Mot de passe est obligatoire' : false,
                }}
                error={errors.password}
              />
            </div>
            <div className="mb-7 md:mb-0">
              <UserTextFieldForm
                control={control}
                name="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                rules={{
                  required: changePassword ? 'Confirmation du mot de passe est obligatoire' : false,
                  validate: (value) => (changePassword ? value === watch('password') || 'Les mots de passe ne correspondent pas' : true),
                }}
                error={errors.confirmPassword}
              />
            </div>
          </div>
        )}
        <div className="my-7">
          <label htmlFor="description" className="font-bold">
            Description <span className="text-sm font-medium">(*Obligatoire)</span>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  className={`w-full h-40 px-2 py-1 border ${errors.description ? 'border-red-600' : 'border-gray-300'} rounded mt-1 resize-y font-normal`}
                />
              )}
              rules={{
                required: 'Description est obligatoire',
                maxLength: { value: 255, message: 'La description ne doit pas dépasser 255 caractères' },
              }}
            />
            {errors.description && <div className="text-red-600">{errors.description.message}</div>}
          </label>
        </div>
        {/* Définition des sports favoris par cases à cocher */}
        <div className="mb-10">
          <label htmlFor="favoriteSports">
            <p className="font-bold mb-3">Sports favoris <span className="text-sm font-medium">(*Un sport minimum)</span></p>
            <div className="flex">
              <p className="mb-3 text-sm font-semibold ml-1 pt-0.5">Scrollez pour tout voir</p>
              <CgScrollV size={22} />
            </div>
            <div className={` bg-slate-50 overflow-y-auto max-h-52 px-4 pt-4 md:w-5/12 xl:w-1/3 border ${errors.favoriteSports ? 'border-red-600' : 'border-gray-300'} rounded-md mt-1`}>
              {sportsList.map((sport) => {
                const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
                return (
                  <div key={sport.id} className="flex items-center gap-2 mb-4">
                    <Controller
                      name="favoriteSports"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          checked={favoriteSports.some((fs) => fs.id === sport.id)}
                          onChange={(e) => {
                            const isAlreadyAdded = favoriteSports.some((fs) => fs.id === sport.id);
                            if (e.target.checked && !isAlreadyAdded) {
                              const updatedSports = [...favoriteSports, sport];
                              setValue('favoriteSports', updatedSports);
                            } else if (!e.target.checked && isAlreadyAdded) {
                              const updatedSports = favoriteSports.filter(
                                (fs) => fs.id !== sport.id,
                              );
                              setValue('favoriteSports', updatedSports);
                            }
                          }}
                          value={undefined}
                        />
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <SportIcon size={22} />
                      <div>{sport.name}</div>
                    </div>
                  </div>
                );
              })}

            </div>
          </label>
          {errors.favoriteSports && <div className="text-red-600">{errors.favoriteSports.message}</div>}
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-7 mb-7">
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="firstName"
              label="Prénom"
              rules={{ required: 'Prénom est obligatoire' }}
              error={errors.firstName}
            />
          </div>
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="lastName"
              label="Nom"
              rules={{ required: 'Nom est obligatoire' }}
              error={errors.lastName}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-7 mb-7">
          {/* Interface de choix de date pour la date de naissance */}
          <div className="mb-7 md:mb-0">
            <label htmlFor="dateOfBirth" className="font-bold">
              Date de naissance <span className="text-sm font-medium">(*Obligatoire)</span>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="dateOfBirth"
                    type="date"
                    className={`w-full px-2 py-1 border ${errors.dateOfBirth ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  />
                )}
                rules={{ required: 'Date de naissance est obligatoire' }}
              />
              {errors.dateOfBirth && <div className="text-red-600">{errors.dateOfBirth.message}</div>}
            </label>
          </div>

          {/* Liste déroulante pour le genre */}
          <div className="mb-7 md:mb-0">
            <label htmlFor="gender" className="font-bold">
              Genre <span className="text-sm font-medium">(*Obligatoire)</span>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="gender"
                    className={`w-full px-2 py-1.5 border bg-slate-50 ${errors.gender ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="masculin">Homme</option>
                    <option value="féminin">Femme</option>
                  </select>
                )}
                rules={{ required: 'Genre est obligatoire' }}
              />
              {errors.gender && <div className="text-red-600">{errors.gender.message}</div>}
            </label>
          </div>
        </div>

        <div className="mb-7 md:mb-0">
          <button
            type="button"
            onClick={openModal}
            className="bg-slate-700 hover:bg-slate-600 transition-colors duration-1000 text-white py-2 px-4 rounded-md mt-4 mb-4"
          >
            Rechercher l&#39;adresse
          </button>
          <p className="font-medium">*Utilisez ce bouton de recherche pour compléter les champs obligatoires ci-dessous.</p>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-7 md:mt-7 mb-10 md:mb-12">
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="region"
              label="Région"
              rules={{ required: 'Région est obligatoire' }}
              error={errors.region}
              disabled={!errorAddress}
            />
          </div>
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="zipCode"
              label="Code postal"
              rules={{ required: 'Code postal est obligatoire' }}
              error={errors.zipCode}
              disabled={!errorAddress}
            />
          </div>
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="city"
              label="Ville"
              rules={{ required: 'Ville est obligatoire' }}
              error={errors.city}
              disabled={!errorAddress}
            />
          </div>
          <div className="mb-7 md:mb-0">
            <UserTextFieldForm
              control={control}
              name="street"
              label="Rue"
              rules={{ required: 'Rue est obligatoire' }}
              error={errors.street}
              disabled={!errorAddress}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 text-white text-lg font-bold rounded mt-4 px-4 py-2"
          >
            Valider
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
