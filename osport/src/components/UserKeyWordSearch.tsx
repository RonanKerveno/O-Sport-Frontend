import React from 'react';
import { UserPublicData } from '@/types';

interface KeywordSearchProps {
  usersData: UserPublicData[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<UserPublicData[]>>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserKeywordSearch(
  {
    usersData, setFilteredUsers, setHasSearched, keyword, setKeyword,
  }: KeywordSearchProps,
) {
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filteredUsers = usersData.filter((user) => {
      const {
        userName, region, city,
      } = user;
      // Assuming favoriteSports is an array of strings here for simplicity
      const favoriteSports = user.favoriteSports.map((sport) => sport.name).join(' ');
      const keywords = [userName, region, city, favoriteSports].join(' ').toLowerCase();
      return keywords.includes(keyword.toLowerCase());
    });

    setFilteredUsers(filteredUsers);
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
            placeholder="mot-clé : nom d'utilisateur, région, ville, sport favori..."
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
