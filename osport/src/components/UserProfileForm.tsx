// Composant de formulaire de profil utilisateur

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getUserByIdPrivate } from '@/services/userService';
import UserTextFieldForm from './UserTextFieldForm';
import {
  UserPublicData, UserPrivateData, SportsListData,
} from '../types';

// Typages TypeScript

type FormValues = UserPublicData & UserPrivateData & { password: string; confirmPassword: string; };

type SubmittedData = Omit<FormValues, 'confirmPassword'>;

interface UserProfileFormProps {
  isEdit: boolean;
  userData: UserPublicData;
  sportsList: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (submittedData: SubmittedData) => void;
}

// Initialisation par défaut des valeurs des donnes privées
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
  const [changePassword, setChangePassword] = useState(!isEdit);
  const [userPrivateData, setUserPrivateData] = useState<UserPrivateData | null>(null);
  // Etat pour le suivi des sports sélectionnés
  const {
    handleSubmit, control, setValue, setError, formState: { errors }, watch, reset,
  } = useForm<FormValues>({ defaultValues: { ...userData, ...userPrivateData } });

  // Définition des données privées de l'utilisateur lorsque les données sont modifiées
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

  // On attend que les données privées soient récupérées avant le render
  if (!userPrivateData) {
    return null;
  }
  const favoriteSports = watch('favoriteSports');

  return (
    // Formulaire de création ou modificaiton de profil utilisant react-hook-form et le composant
    // UserTextFieldForm pour les types d'inputs les plus répétés.
    <div className="flex flex-col min-h-screen items-center justify-center container mx-auto px-4 w-screen p-10">
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
        className="max-w-sm"
      >

        <UserTextFieldForm
          control={control}
          name="userName"
          label="Nom d'utilisateur"
          rules={{ required: 'Nom d\'utilisateur est obligatoire' }}
          error={errors.userName}
        />
        <UserTextFieldForm
          control={control}
          name="email"
          label="Email"
          type="email"
          rules={{ required: 'Email est obligatoire' }}
          error={errors.email}
        />
        {/* Vérification du mot de passe par un champ de confirmation */}
        {isEdit && (
          <div className="my-4">
            <label htmlFor="changePassword" className="font-bold block">
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
          <>
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
          </>
        )}
        <div className="my-4">
          <label htmlFor="description" className="font-bold block">
            Description
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  className={`w-full px-2 py-1 border ${errors.description ? 'border-red-600' : 'border-gray-300'} rounded mt-1 resize-y font-normal`}
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
        {/* Définition des sports favoris pas cases à cocher */}
        <div className="my-4">
          <label htmlFor="favoriteSports" className="font-bold block">
            Sports favoris
            {sportsList.map((sport) => (
              <div key={sport.id}>
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
                          const updatedSports = favoriteSports.filter((fs) => fs.id !== sport.id);
                          setValue('favoriteSports', updatedSports);
                        }
                      }}
                      value={undefined}
                    />
                  )}
                />
                {sport.name}
              </div>
            ))}
          </label>
          {errors.favoriteSports && <div className="text-red-600">{errors.favoriteSports.message}</div>}
        </div>
        <UserTextFieldForm
          control={control}
          name="firstName"
          label="Prénom"
          rules={{ required: 'Prénom est obligatoire' }}
          error={errors.firstName}
        />
        <UserTextFieldForm
          control={control}
          name="lastName"
          label="Nom"
          rules={{ required: 'Nom est obligatoire' }}
          error={errors.lastName}
        />
        {/* Interface de choix de date pour la date de naissance */}
        <div className="my-4">
          <label htmlFor="dateOfBirth" className="font-bold block">
            Date de naissance
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
        <div className="my-4">
          <label htmlFor="gender" className="font-bold block">
            Genre
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
                  className={`w-full px-2 py-1 border ${errors.gender ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
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
        <UserTextFieldForm
          control={control}
          name="region"
          label="Région"
          rules={{ required: 'Région est obligatoire' }}
          error={errors.region}
        />
        <UserTextFieldForm
          control={control}
          name="zipCode"
          label="Code postal"
          rules={{ required: 'Code postal est obligatoire' }}
          error={errors.zipCode}
        />
        <UserTextFieldForm
          control={control}
          name="city"
          label="Ville"
          rules={{ required: 'Ville est obligatoire' }}
          error={errors.city}
        />
        <UserTextFieldForm
          control={control}
          name="street"
          label="Rue"
          rules={{ required: 'Rue est obligatoire' }}
          error={errors.street}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
