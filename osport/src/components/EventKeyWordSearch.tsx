// Composant formulaire de recherche d'événements par mots-clé.

import React, { RefObject } from 'react';
import { EventData } from '@/types';

// Typage des props
interface KeywordSearchProps {
  eventList: EventData;
  setFilteredEvents: React.Dispatch<React.SetStateAction<EventData>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchResultRef: RefObject<HTMLDivElement>;
}

export default function EventKeywordSearch(
  {
    eventList, setFilteredEvents, setHasSearched, keyword, setKeyword, searchResultRef,
  }: KeywordSearchProps,
) {
  // Fonction gérant la soumission des mots-clé.
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filteredEvents = eventList.filter((event) => {
      const {
        // Périmètre de la recherche
        title, description, city, region, zipCode, creator, sport,
      } = event;
      const keywords = [title, description, city, region, zipCode, creator.userName, sport.name].join(' ').toLowerCase();
      return keywords.includes(keyword.toLowerCase());
    });

    setFilteredEvents(filteredEvents);
    setHasSearched(true);
    // scroll vers searchResult
    searchResultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label htmlFor="keyword">
          <h2 className="text-xl font-semibold mb-5">Recherche par mots-clés</h2>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Titre, auteur..."
            className="text-gray-700 shadow-md border py-2 px-3 w-full"
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
