import React, { FormEvent } from 'react';
import { UserPublicData } from '@/types';

interface UserSearchFormProps {
  usersData: UserPublicData[];
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  form: {
    searchType: string;
    region: string;
    city: string;
    gender: string;
    favoriteSport: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    searchType: string;
    region: string;
    city: string;
    gender: string;
    favoriteSport: string;
  }>>;
}

export default function UserSearchForm({
  usersData, handleSubmit, form, setForm,
}: UserSearchFormProps) {
  const regions = Array.from(new Set(usersData.map((user) => user.region)));
  const sortedRegions = regions.sort();
  const cities = Array.from(new Set(usersData.map((user) => user.city)));
  const sortedCities = cities.sort();
  const genders = Array.from(new Set(usersData.map((user) => user.gender)));

  // Concatenate favorite sports from all users and remove duplicates
  const favoriteSports = Array.from(
    new Set(usersData.flatMap((user) => user.favoriteSports.map((sport) => sport.name))),
  );

  return (
    <form onSubmit={handleSubmit} className="p-4">

      <div className="my-2">
        <label htmlFor="searchType" className="mt-2 mb-1">
          Type de recherche
          <select
            id="searchType"
            className="bg-white text-gray-700 shadow-md border"
            value={form.searchType}
            onChange={(e) => setForm({
              ...form, searchType: e.target.value, region: '', city: '',
            })}
          >
            <option value="">Sélectionnez un type de recherche</option>
            <option value="region">Région</option>
            <option value="city">Ville</option>
          </select>
        </label>
      </div>

      {form.searchType === 'region' && (
        <div>
          <label htmlFor="region" className="mt-2 mb-1">
            Région
            <select
              id="region"
              className="bg-white text-gray-700 shadow-md border"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
            >
              <option value="">Sélectionnez une région</option>
              {sortedRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {form.searchType === 'city' && (
        <div>
          <label htmlFor="city" className="mt-2 mb-1">
            Ville
            <select
              id="city"
              className="bg-white text-gray-700 shadow-md border"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            >
              <option value="">Sélectionnez une ville</option>
              {sortedCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="my-2">
        <label htmlFor="gender" className="mt-2 mb-1">
          Genre
          <select
            id="gender"
            className="bg-white text-gray-700 shadow-md border"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Sélectionnez un genre</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="my-2">
        <label htmlFor="favoriteSport" className="mt-2 mb-1">
          Sport Favori
          <select
            id="favoriteSport"
            className="bg-white text-gray-700 shadow-md border"
            value={form.favoriteSport}
            onChange={(e) => setForm({ ...form, favoriteSport: e.target.value })}
          >
            <option value="">Sélectionnez un sport</option>
            {favoriteSports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4">
        <button type="submit" className="border bg-blue-500 hover:bg-blue-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded mb-9">
          Recherche
        </button>
      </div>
    </form>
  );
}
