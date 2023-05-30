import React from 'react';
import { EventData } from '@/types';

interface KeywordSearchProps {
  eventList: EventData;
  setFilteredEvents: React.Dispatch<React.SetStateAction<EventData>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function EventKeywordSearch(
  {
    eventList, setFilteredEvents, setHasSearched, keyword, setKeyword,
  }: KeywordSearchProps,
) {
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filteredEvents = eventList.filter((event) => {
      const {
        title, description, city, region, zipCode, creator, sport,
      } = event;
      const keywords = [title, description, city, region, zipCode, creator.userName, sport.name].join(' ').toLowerCase();
      return keywords.includes(keyword.toLowerCase());
    });

    setFilteredEvents(filteredEvents);
    setHasSearched(true);
  };

  return (
    <form onSubmit={handleSubmit} className="ml-4">
      <div>
        <label htmlFor="keyword">
          <h2 className="font-semibold text-gray-700">Recherche par mots-clés</h2>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="mot-clé : titre, auteur..."
            className="bg-white text-gray-700 shadow-md border"
          />
        </label>
      </div>
      <div className="mt-4">
        <button type="submit" className="border bg-blue-500 hover:bg-blue-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded">
          Rechercher
        </button>
      </div>
    </form>
  );
}
