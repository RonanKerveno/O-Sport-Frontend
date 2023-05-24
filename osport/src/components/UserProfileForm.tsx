import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserPublicData, UserPrivateData, SportsListData } from '../types';
import { getUserByIdPrivate } from '../services/userService';

type FormValues = UserPublicData & UserPrivateData & { password: string; confirmPassword: string; };

type SubmittedData = Omit<FormValues, 'confirmPassword'>;

interface UserProfileFormProps {
  isEdit: boolean;
  userData: UserPublicData;
  sportsList: SportsListData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (submittedData: SubmittedData) => void;
}

export default function UserProfileForm({
  isEdit, userData, sportsList, onSubmit,
}: UserProfileFormProps) {
  const [changePassword, setChangePassword] = useState(!isEdit);
  const [userPrivateData, setUserPrivateData] = useState<UserPrivateData | null>(null);
  const {
    handleSubmit, control, setValue, formState: { errors }, watch, reset,
  } = useForm<FormValues>({ defaultValues: { ...userData, ...userPrivateData } });

  useEffect(() => {
    const fetchPrivateData = async () => {
      const response = await getUserByIdPrivate(userData.id);
      if (response.success) {
        setUserPrivateData(response.userPrivate);
        // Update default values
        const updatedDefaultValues = { ...userData, ...response.userPrivate };
        if (!changePassword) {
          updatedDefaultValues.password = ''; // Clear the password field if changePassword is false
          updatedDefaultValues.confirmPassword = '';
        }
        reset(updatedDefaultValues);
      }
    };
    fetchPrivateData();
  }, [userData.id, userData, reset, changePassword]);

  if (!userPrivateData) {
    return null; // Or render a loading spinner
  }
  const favoriteSports = watch('favoriteSports');

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit((data) => {
          const { confirmPassword, ...submittedData } = data;
          onSubmit(submittedData as SubmittedData);
        })}
        className="max-w-sm"
      >
        <div className="my-4">
          <label htmlFor="username" className="font-bold block">
            Nom d&#39;utilisateur
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="username"
                  className={`w-full px-2 py-1 border ${errors.userName ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Nom d\'utilisateur est obligatoire' }}
            />
            {errors.userName && <div className="text-red-600">{errors.userName.message}</div>}
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="email" className="font-bold block">
            Email
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="email"
                  className={`w-full px-2 py-1 border ${errors.email ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Email est obligatoire' }}
            />
            {errors.email && <div className="text-red-600">{errors.email.message}</div>}
          </label>
        </div>
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
            <div className="my-4">
              <label htmlFor="password" className="font-bold block">
                {isEdit ? 'Nouveau mot de passe' : 'Mot de passe'}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      className={`w-full px-2 py-1 border ${errors.password ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    />
                  )}
                  rules={{
                    required: changePassword ? 'Mot de passe est obligatoire' : false,
                  }}
                />
                {errors.password && <div className="text-red-600">{errors.password.message}</div>}
              </label>
            </div>
            <div className="my-4">
              <label htmlFor="confirmPassword" className="font-bold block">
                Confirmer le mot de passe
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      className={`w-full px-2 py-1 border ${errors.confirmPassword ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                    />
                  )}
                  rules={{
                    required: changePassword ? 'Confirmation du mot de passe est obligatoire' : false,
                    validate: (value) => (changePassword ? value === watch('password') || 'Les mots de passe ne correspondent pas' : true),
                  }}
                />
                {errors.confirmPassword && <div className="text-red-600">{errors.confirmPassword.message}</div>}
              </label>
            </div>
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
              rules={{ required: 'Description est obligatoire' }}
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
        </div>

        <div className="my-4">
          <label htmlFor="firstname" className="font-bold block">
            Prénom
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="firstname"
                  className={`w-full px-2 py-1 border ${errors.firstName ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Prénom est obligatoire' }}
            />
            {errors.firstName && <div className="text-red-600">{errors.firstName.message}</div>}
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="lastname" className="font-bold block">
            Nom
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="lastname"
                  className={`w-full px-2 py-1 border ${errors.lastName ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Nom est obligatoire' }}
            />
            {errors.lastName && <div className="text-red-600">{errors.lastName.message}</div>}
          </label>
        </div>
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
        <div className="my-4">
          <label htmlFor="region" className="font-bold block">
            Région
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="region"
                  className={`w-full px-2 py-1 border ${errors.region ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Région est obligatoire' }}
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
                <input
                  {...field}
                  id="zipCode"
                  type="text"
                  className={`w-full px-2 py-1 border ${errors.zipCode ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Code postal est obligatoire' }}
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
                <input
                  {...field}
                  id="city"
                  type="text"
                  className={`w-full px-2 py-1 border ${errors.city ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Ville est obligatoire' }}
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
                <input
                  {...field}
                  id="street"
                  type="text"
                  className={`w-full px-2 py-1 border ${errors.street ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
                />
              )}
              rules={{ required: 'Rue est obligatoire' }}
            />
            {errors.street && <div className="text-red-600">{errors.street.message}</div>}
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
