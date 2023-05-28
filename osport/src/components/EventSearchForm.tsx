import React, { FormEvent } from 'react';
import { EventData } from '@/types';

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
  setFilteredEvents: React.Dispatch<React.SetStateAction<EventData>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventSearchForm({
  eventList, handleSubmit, form, setForm, setFilteredEvents, setHasSearched,
}: EventSearchFormProps) {
  const regions = Array.from(new Set(eventList.map((event) => event.region)));
  const cities = Array.from(new Set(eventList.map((event) => event.city)));
  const zipCodes = Array.from(new Set(eventList.map((event) => event.zipCode)));
  const sports = Array.from(new Set(eventList.map((event) => event.sport.name)));

  const resetForm = () => {
    setForm({
      searchType: '',
      region: '',
      zipCode: '',
      city: '',
      sport: '',
      startDateTime: '',
      endDateTime: '',
    });
    setFilteredEvents(eventList);
    setHasSearched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <h2 className="font-semibold text-gray-700">Recherche par filtres</h2>
        <button
          type="button"
          className="border text-sm bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 my-2 rounded"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>

      <div className="my-2">
        <label htmlFor="searchType" className="mt-2 mb-1">
          Type de recherche
          <select
            id="searchType"
            className="bg-white text-gray-700 shadow-md border"
            value={form.searchType}
            onChange={(e) => setForm({
              ...form, searchType: e.target.value, region: '', zipCode: '', city: '',
            })}
          >
            <option value="">Sélectionnez un type de recherche</option>
            <option value="region">Région</option>
            <option value="zipCode">Code Postal</option>
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
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {form.searchType === 'zipCode' && (
        <div>
          <label htmlFor="zipCode" className="mt-2 mb-1">
            Code Postal
            <select
              id="zipCode"
              className="bg-white text-gray-700 shadow-md border"
              value={form.zipCode}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            >
              <option value="">Sélectionnez un code postal</option>
              {zipCodes.map((zipCode) => (
                <option key={zipCode} value={zipCode}>
                  {zipCode}
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
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="my-2">
        <label htmlFor="startDateTime" className="mt-2 mb-1">
          Date et heure de début
          <input
            type="datetime-local"
            id="startDateTime"
            className="bg-white text-gray-700 shadow-md border"
            value={form.startDateTime}
            onChange={(e) => setForm({ ...form, startDateTime: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label htmlFor="endDateTime" className="mt-2 mb-1">
          Date et heure de fin
          <input
            type="datetime-local"
            id="endDateTime"
            className="bg-white text-gray-700 shadow-md border"
            value={form.endDateTime}
            onChange={(e) => setForm({ ...form, endDateTime: e.target.value })}
          />
        </label>
      </div>

      <div className="my-2">
        <label htmlFor="sport" className="mt-2 mb-1">
          Sport
          <select
            id="sport"
            className="bg-white text-gray-700 shadow-md border"
            value={form.sport}
            onChange={(e) => setForm({ ...form, sport: e.target.value })}
          >
            <option value="">Sélectionnez un sport</option>
            {sports.map((sport) => (
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
