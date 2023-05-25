import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  UserPublicData, UserPrivateData, SportsListData, FavoriteSport,
} from '../types';
import { getUserByIdPrivate } from '../services/userService';
import FormTextField from './FormTextField';

type FormValues = UserPublicData & UserPrivateData & { password: string; confirmPassword: string; };

type SubmittedData = Omit<FormValues, 'confirmPassword'>;

interface UserProfileFormProps {
  isEdit: boolean;
  userData: UserPublicData;
  sportsList: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (submittedData: SubmittedData) => void;
}

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
  const [selectedSports, setSelectedSports] = useState<FavoriteSport[]>([]);
  const {
    handleSubmit, control, setValue, setError, formState: { errors }, watch, reset,
  } = useForm<FormValues>({ defaultValues: { ...userData, ...userPrivateData } });

  useEffect(() => {
    const fetchPrivateData = async () => {
      let updatedDefaultValues;

      if (isEdit) {
        const response = await getUserByIdPrivate(userData.id);
        if (response.success) {
          setUserPrivateData(response.userPrivate);
          // Update default values
          updatedDefaultValues = { ...userData, ...response.userPrivate };
          if (!changePassword) {
            updatedDefaultValues.password = ''; // Clear the password field if changePassword is false
            updatedDefaultValues.confirmPassword = '';
          }
          reset(updatedDefaultValues);
        }
      } else {
        setUserPrivateData(nullUserPrivateData);
        updatedDefaultValues = { ...userData, ...nullUserPrivateData };
        if (!changePassword) {
          updatedDefaultValues.password = ''; // Clear the password field if changePassword is false
          updatedDefaultValues.confirmPassword = '';
        }
        reset(updatedDefaultValues);
      }
    };
    fetchPrivateData();
  }, [userData.id, userData, reset, changePassword, isEdit]);

  if (!userPrivateData) {
    return null; // Or render a loading spinner
  }
  const favoriteSports = watch('favoriteSports');

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit((data) => {
          const { confirmPassword, ...submittedData } = data;
          // vérifier si le nombre de sports sélectionnés est entre 1 et 5
          if (selectedSports.length < 1 || selectedSports.length > 5) {
            // si ce n'est pas le cas, définir une erreur personnalisée
            setError('favoriteSports', {
              type: 'manual',
              message: 'Vous devez sélectionner entre 1 et 5 sports',
            });
          } else {
            // si c'est correct, continuez avec la soumission du formulaire
            onSubmit(submittedData as SubmittedData);
          }
        })}
        className="max-w-sm"
      >

        <FormTextField
          control={control}
          name="userName"
          label="Nom d'utilisateur"
          rules={{ required: 'Nom d\'utilisateur est obligatoire' }}
          error={errors.userName}
        />
        <FormTextField
          control={control}
          name="email"
          label="Email"
          type="email"
          rules={{ required: 'Email est obligatoire' }}
          error={errors.email}
        />

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
            <FormTextField
              control={control}
              name="password"
              label={isEdit ? 'Nouveau mot de passe' : 'Mot de passe'}
              type="password"
              rules={{
                required: changePassword ? 'Mot de passe est obligatoire' : false,
              }}
              error={errors.password}
            />
            <FormTextField
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
                          setSelectedSports(updatedSports);
                        } else if (!e.target.checked && isAlreadyAdded) {
                          const updatedSports = favoriteSports.filter((fs) => fs.id !== sport.id);
                          setValue('favoriteSports', updatedSports);
                          setSelectedSports(updatedSports);
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
        <FormTextField
          control={control}
          name="firstName"
          label="Prénom"
          rules={{ required: 'Prénom est obligatoire' }}
          error={errors.firstName}
        />
        <FormTextField
          control={control}
          name="lastName"
          label="Nom"
          rules={{ required: 'Nom est obligatoire' }}
          error={errors.lastName}
        />
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
        <FormTextField
          control={control}
          name="region"
          label="Région"
          rules={{ required: 'Région est obligatoire' }}
          error={errors.region}
        />
        <FormTextField
          control={control}
          name="zipCode"
          label="Code postal"
          rules={{ required: 'Code postal est obligatoire' }}
          error={errors.zipCode}
        />
        <FormTextField
          control={control}
          name="city"
          label="Ville"
          rules={{ required: 'Ville est obligatoire' }}
          error={errors.city}
        />
        <FormTextField
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
