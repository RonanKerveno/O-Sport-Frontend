// Page de recherche d'utilisateurs

import { useEffect, useRef, useState } from 'react';
import { UserPublicData } from '@/types';
import getUsersServerSideProps from '@/utils/usersServerSideProps';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import UserSearchForm from '@/components/UserSearchForm';
import router from 'next/router';
import UserKeywordSearch from '@/components/UserKeyWordSearch';
import UserCard from '@/components/UserCard';
import Link from 'next/link';
import { RiUserSearchFill } from 'react-icons/ri';

// Typage des données reccueillies en SSR
interface EventsDataProps {
  usersData: UserPublicData[];
}

export default function SearchUser({ usersData }: EventsDataProps) {
  const [form, setForm] = useState({
    searchType: '',
    region: '',
    city: '',
    gender: '',
    favoriteSport: '',
  });

  // State gérant les listes d'utilisateurs filtrés.
  const [filteredUsers, setFilteredUsers] = useState<UserPublicData[]>(usersData);

  // State gérant le statut de lancement d'une recherche.
  const [hasSearched, setHasSearched] = useState(false);

  // State gérant les mots clés saisis pour la recherche.
  const [keyword, setKeyword] = useState('');

  // Fonction gérant la recherche par filtrage de la liste des utilisateurs renvoyés par l'API.
  // Il s'agit donc d'une recherche purement frontend.
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    let updatedUsers = [...usersData];

    // Recherche par type de lieu
    if (form.searchType) {
      updatedUsers = updatedUsers.filter((user) => {
        switch (form.searchType) {
          case 'region':
            return user.region === form.region;
          case 'city':
            return user.city === form.city;
          default:
            return true;
        }
      });
    }
    // Recherche par genre
    if (form.gender) {
      updatedUsers = updatedUsers.filter(
        (user) => user.gender === form.gender,
      );
    }
    // Recherche par sport favori
    if (form.favoriteSport) {
      updatedUsers = updatedUsers.filter(
        (user) => user.favoriteSports.some((sport) => sport.name === form.favoriteSport),
      );
    }

    setFilteredUsers(updatedUsers);
    setHasSearched(true);
  };

  // Réinitialisation de la recherche.
  const resetForm = () => {
    setForm({
      searchType: '',
      region: '',
      city: '',
      gender: '',
      favoriteSport: '',
    });
    setKeyword('');
    setFilteredUsers(usersData);
    setHasSearched(false);
  };

  // Gestion du scroll vers le résultat de recherche.

  // Création d'une reférence pour scroller vers les résultats de recherche.
  const searchResultRef = useRef<HTMLDivElement | null>(null);

  // useEffect gérant le déclenchement du scroll vers la recherche quand tous les éléments sont
  // rendus, afin d'éviter des imprécisions sur le point d'arrivée dues à un rendu en cours.
  useEffect(() => {
    if (hasSearched) {
      searchResultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredUsers, hasSearched]);

  // Rendu conditionnel selon qu'il y ait des utilisateurs trouvés ou non.
  const renderUserCards = () => {
    if (!hasSearched) {
      return null;
    }
    if (filteredUsers.length === 0) {
      return <div className="text-center text-xl font-bold mt-10">Aucun résultat trouvé</div>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-5">
        {hasSearched && filteredUsers.map((user) => (
          <Link key={user.id} href={`/profil/${user.id}`} className="hover:scale-105 transition-transform duration-200 w-full">
            <UserCard userData={user} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>

      <section className="text-gray-800">
        <div className="mb-10">
          <div className="flex justify-center md:block mb-10">
            <button
              type="button"
              className="border text-sm bg-[#264b81] hover:bg-[#07252e] transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/recherche')}
            >
              Aller sur recherche événements
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 mb-7">
            <RiUserSearchFill size={24} />
            <h1 className="font-bold text-xl uppercase">Recherche d&#39;utilisateurs</h1>
          </div>
        </div>

        <div className="mb-12">
          <UserKeywordSearch
            usersData={usersData}
            setFilteredUsers={setFilteredUsers}
            setHasSearched={setHasSearched}
            keyword={keyword}
            setKeyword={setKeyword}
            searchResultRef={searchResultRef}
          />
        </div>

        <div className="bg-slate-200 py-6 px-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-5">Recherche par filtres</h2>
          <UserSearchForm
            usersData={usersData}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
          />
        </div>

        <div ref={searchResultRef} className="flex justify-center mb-12 pt-10">
          <button
            type="button"
            className="border text-sm bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            onClick={resetForm}
          >
            Reset des champs de recherche
          </button>
        </div>
        {renderUserCards()}

      </section>

    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste des utilisateurs.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getUsersServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
