// Composant formulaire de recherche d'utilisateurs.

// Eslint ne prend pas le Select de react-select pour un contrôle, donc désactivation de la règle.
// Cela ne devrait pas avoir d'impact sur l'accéssibilité.
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { FormEvent } from 'react';
import { UserPublicData } from '@/types';
import Select from 'react-select';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';

// Typage des props
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
  // Définition des filtres selon la recherche demandée.
  const regions = Array.from(new Set(usersData.map((user) => user.region)));
  const sortedRegions = regions.sort();
  const cities = Array.from(new Set(usersData.map((user) => user.city)));
  const sortedCities = cities.sort();
  const genders = Array.from(new Set(usersData.map((user) => user.gender)));

  // Concaténation des sports favoris de tous les utilisateurs et suppression des doublons.
  const favoriteSports = Array.from(
    new Set(usersData.flatMap((user) => user.favoriteSports.map((sport) => sport.name))),
  );

  // Options pour les Select
  const searchTypeOptions = [
    { value: 'region', label: 'Région' },
    { value: 'city', label: 'Ville' },
  ];
  const regionOptions = sortedRegions.map((region) => ({ value: region, label: region }));
  const cityOptions = sortedCities.map((city) => ({ value: city, label: city }));
  const genderOptions = genders.map((gender) => ({ value: gender, label: gender }));
  const sportOptions = favoriteSports.map((sport) => {
    const SportIcon = sportIconMap[sportNameConvert(sport)] || sportIconMap.Sports;
    return {
      value: sport,
      label: (
        <div className="flex items-center gap-2">
          <SportIcon size={22} />
          <div>{sport}</div>
        </div>
      ),
    };
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-7">
        <div className="mb-4">
          <label htmlFor="searchType">
            <h2 className="text-lg font-semibold mb-2">Filtrage par lieu</h2>
            <Select
              id="searchType"
              className="text-gray-700 shadow-md"
              placeholder="Sélectionner un type de lieu"
              value={form.searchType ? searchTypeOptions.find(
                (option) => option.value === form.searchType,
              ) : null}
              onChange={(option) => setForm({
                ...form, searchType: option ? option.value : '', region: '', city: '',
              })}
              options={searchTypeOptions}
              isClearable
            />
          </label>
        </div>

        {form.searchType === 'region' && (
          <div>
            <label htmlFor="region">
              <p className="text-sm font-medium mb-1">Région</p>
              <Select
                id="region"
                className="text-gray-700 shadow-md"
                placeholder="Sélectionner une région"
                value={regionOptions.find((option) => option.value === form.region)}
                onChange={(option) => setForm({ ...form, region: option ? option.value : '' })}
                options={regionOptions}
              />
            </label>
          </div>
        )}

        {form.searchType === 'city' && (
          <div>
            <label htmlFor="city">
              <p className="text-sm font-medium mb-1">Ville</p>
              <Select
                id="city"
                className="text-gray-700 shadow-md"
                placeholder="Sélectionner une ville"
                value={cityOptions.find((option) => option.value === form.city)}
                onChange={(option) => setForm({ ...form, city: option ? option.value : '' })}
                options={cityOptions}
              />
            </label>
          </div>
        )}
      </div>

      <div className="mb-7">
        <label htmlFor="gender">
          <h2 className="text-lg font-semibold mb-2">Filtrage par genre</h2>
          <Select
            id="gender"
            className="text-gray-700 shadow-md"
            placeholder="Sélectionner un genre"
            value={form.gender ? genderOptions.find(
              (option) => option.value === form.gender,
            ) : null}
            onChange={(option) => setForm({ ...form, gender: option ? option.value : '' })}
            options={genderOptions}
            isClearable
          />
        </label>
      </div>

      <div className="mb-8">
        <label htmlFor="sport">
          <h2 className="text-lg font-semibold mb-2">Filtrage par sport</h2>
          <Select
            id="sport"
            className="text-gray-700 shadow-md"
            placeholder="Sélectionner un sport"
            value={form.favoriteSport ? sportOptions.find(
              (option) => option.value === form.favoriteSport,
            ) : null}
            onChange={(option) => setForm({ ...form, favoriteSport: option ? option.value : '' })}
            options={sportOptions}
            isClearable
          />
        </label>
      </div>

      <div>
        <button type="submit" className="border bg-[#264b81] hover:bg-[#07252e] transition-colors duration-1000 text-white font-semibold py-2 px-4 rounded">
          Rechercher
        </button>
      </div>
    </form>
  );
}
