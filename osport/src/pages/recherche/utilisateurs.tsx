import { useState } from 'react';
import { UserPublicData } from '@/types';
import getUsersServerSideProps from '@/utils/usersServerSideProps';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import InfoPanel from '@/components/InfoPanel';
import UserSearchForm from '@/components/UserSearchForm';
import router from 'next/router';
import UserKeywordSearch from '@/components/UserKeyWordSearch';
import UserCard from '@/components/UserCard';
import Link from 'next/link';

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

  const [filteredUsers, setFilteredUsers] = useState<UserPublicData[]>(usersData);
  const [hasSearched, setHasSearched] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    let updatedUsers = [...usersData];

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
    if (form.gender) {
      updatedUsers = updatedUsers.filter(
        (user) => user.gender === form.gender,
      );
    }
    if (form.favoriteSport) {
      updatedUsers = updatedUsers.filter(
        (user) => user.favoriteSports.some((sport) => sport.name === form.favoriteSport),
      );
    }

    setFilteredUsers(updatedUsers);
    setHasSearched(true);
  };

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

  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <InfoPanel />
      <button
        type="button"
        className="ml-4 border text-xs bg-blue-700 hover:bg-blue-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/recherche')}
      >
        Aller sur recherche événements
      </button>
      <h1 className="font-bold text-xl mx-4 my-5">Recherche d&#39;utilisateurs</h1>
      <div className="bg-white mx-4 rounded-md p-7">
        <button
          type="button"
          className="ml-4 border text-sm bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 my-2 rounded"
          onClick={resetForm}
        >
          Reset
        </button>

        <div className="my-4">
          <UserKeywordSearch
            usersData={usersData}
            setFilteredUsers={setFilteredUsers}
            setHasSearched={setHasSearched}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        <div>
          <UserSearchForm
            usersData={usersData}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {hasSearched && filteredUsers.map((user) => (
            <Link key={user.id} href={`/profil/${user.id}`} className="hover:scale-105 transition-transform duration-200">
              <UserCard userData={user} />
            </Link>
          ))}
        </div>

      </div>

    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste de événements.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getUsersServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
