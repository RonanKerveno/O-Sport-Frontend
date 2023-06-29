// Composant formulaire de recherche d'événements.

// Eslint ne prend pas le Select de react-select pour un contrôle, donc désactivation de la règle.
// Cela ne devrait pas avoir d'impact sur l'accéssibilité.
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { FormEvent } from 'react';
import { EventData } from '@/types';
import Select from 'react-select';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';

// Typage des props
interface EventSearchFormProps {
  eventList: EventData;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  form: {
    searchType: string;
    region: string;
    zipCode: string;
    city: string;
    sport: string;
    startDateTime: string;
    endDateTime: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    searchType: string;
    region: string;
    zipCode: string;
    city: string;
    sport: string;
    startDateTime: string;
    endDateTime: string;
  }>>;
}

export default function EventSearchForm({
  eventList, handleSubmit, form, setForm,
}: EventSearchFormProps) {
  // Définition des filtres selon la recherche demandée.
  const regions = Array.from(new Set(eventList.map((event) => event.region)));
  const sortedRegions = regions.sort();
  const departments = Array.from(new Set(eventList.map((event) => event.zipCode.slice(0, 2))));
  const sortedDepartments = departments.sort();
  const zipCodes = Array.from(new Set(eventList.map((event) => event.zipCode)));
  const sortedZipCodes = zipCodes.sort();
  const cities = Array.from(new Set(eventList.map((event) => event.city)));
  const sortedCities = cities.sort();
  const sports = Array.from(new Set(eventList.map((event) => event.sport.name)));
  const sortedSports = sports.sort();

  // Options pour les Select
  const searchTypeOptions = [
    { value: 'region', label: 'Région' },
    { value: 'department', label: 'Numéro département' },
    { value: 'zipCode', label: 'Code Postal' },
    { value: 'city', label: 'Ville' },
  ];
  const regionOptions = sortedRegions.map((region) => ({ value: region, label: region }));
  const departmentOptions = sortedDepartments.map((department) => (
    { value: department, label: department }));
  const zipCodeOptions = sortedZipCodes.map((zipCode) => ({ value: zipCode, label: zipCode }));
  const cityOptions = sortedCities.map((city) => ({ value: city, label: city }));
  const sportOptions = sortedSports.map((sport) => {
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
      <div className="mb-7 md:mb-8 md:flex items-center gap-14">
        <div className="mb-4 md:mb-0 md:w-2/5">
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
                ...form, searchType: option ? option.value : '', region: '', zipCode: '', city: '',
              })}
              options={searchTypeOptions}
              isClearable
            />
          </label>
        </div>

        {form.searchType === 'region' && (
          <div className="md:mt-9 md:w-2/5">
            <label htmlFor="region">
              <p className="text-sm font-medium mb-1 md:hidden">Région</p>
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

        {form.searchType === 'department' && (
          <div className="md:mt-9 md:w-2/5">
            <label htmlFor="department">
              <p className="text-sm font-medium mb-1 md:hidden">N° département</p>
              <Select
                id="department"
                className="text-gray-700 shadow-md"
                placeholder="Sélectionner un département"
                value={departmentOptions.find((
                  option,
                ) => option.value === form.zipCode.slice(0, 2))}
                onChange={(option) => setForm({ ...form, zipCode: option ? option.value : '' })}
                options={departmentOptions}
              />
            </label>
          </div>
        )}

        {form.searchType === 'zipCode' && (
          <div className="md:mt-9 md:w-2/5">
            <label htmlFor="zipCode">
              <p className="text-sm font-medium mb-1 md:hidden">Code Postal</p>
              <Select
                id="zipCode"
                className="text-gray-700 shadow-md"
                placeholder="Sélectionner un code postal"
                value={zipCodeOptions.find((option) => option.value === form.zipCode)}
                onChange={(option) => setForm({ ...form, zipCode: option ? option.value : '' })}
                options={zipCodeOptions}
              />
            </label>
          </div>
        )}

        {form.searchType === 'city' && (
          <div className="md:mt-9 md:w-2/5">
            <label htmlFor="city">
              <p className="text-sm font-medium mb-1 md:hidden">Ville</p>
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

      <div className="mb-7 md:mb-5 md:flex gap-14">
        <div className="mb-4 md:w-2/5">
          <h2 className="text-lg font-semibold mb-4">Filtrage par date</h2>
          <label htmlFor="startDateTime">
            <p className="text-sm font-medium mb-1">Date et heure minimum</p>
            <input
              type="datetime-local"
              id="startDateTime"
              className="bg-white text-gray-500 shadow-md border w-full px-2.5 py-1.5 rounded"
              value={form.startDateTime}
              onChange={(e) => setForm({ ...form, startDateTime: e.target.value })}
            />
          </label>
        </div>

        <div className="md:mt-11 md:w-2/5">
          <label htmlFor="endDateTime">
            <p className="text-sm font-medium mb-1">Date et heure maximum</p>
            <input
              type="datetime-local"
              id="endDateTime"
              className="bg-white text-gray-500 shadow-md border w-full px-2.5 py-1.5 rounded"
              value={form.endDateTime}
              onChange={(e) => setForm({ ...form, endDateTime: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="mb-8 md:w-2/5">
        <label htmlFor="sport">
          <h2 className="text-lg font-semibold mb-2">Filtrage par sport</h2>
          <Select
            id="sport"
            className="text-gray-700 shadow-md"
            placeholder="Sélectionner un sport"
            value={form.sport ? sportOptions.find(
              (option) => option.value === form.sport,
            ) : null}
            onChange={(option) => setForm({ ...form, sport: option ? option.value : '' })}
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
