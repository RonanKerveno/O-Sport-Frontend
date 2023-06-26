// Composant formulaire de recherche d'utilisateurs par mots-clé.

import React, { RefObject } from 'react';
import { UserPublicData } from '@/types';

interface KeywordSearchProps {
  usersData: UserPublicData[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<UserPublicData[]>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchResultRef: RefObject<HTMLDivElement>;
}

export default function UserKeywordSearch(
  {
    usersData, setFilteredUsers, setHasSearched, keyword, setKeyword, searchResultRef,
  }: KeywordSearchProps,
) {
  // Fonction gérant la soumission des mots-clé.
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filteredUsers = usersData.filter((user) => {
      const {
        // Périmètre de la recherche
        userName, region, city,
      } = user;
      const favoriteSports = user.favoriteSports.map((sport) => sport.name).join(' ');
      const keywords = [userName, region, city, favoriteSports].join(' ').toLowerCase();
      return keywords.includes(keyword.toLowerCase());
    });

    setFilteredUsers(filteredUsers);
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
            placeholder="Nom d'utilisateur, région, ville, sport favori..."
            className="bg-white text-gray-700 shadow-md border py-2 px-3 w-full"
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
