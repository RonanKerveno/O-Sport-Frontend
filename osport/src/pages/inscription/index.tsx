// Page d'inscription au site

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import getSportsServerSideProps from '@/utils/sportsServerSideProps';
import { SportsListData, UserPrivateData, UserPublicData } from '@/types';
import { createOneUser } from '@/services/userService';
import router from 'next/router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useLoggedRedirect from '@/hooks/useLoggedRedirect';
import UserProfileForm from '@/components/UserProfileForm';
import { useToast } from '@/contexts/ToastContext';

// Typage TypeScript
type FullUserData = UserPublicData & UserPrivateData;

interface DataProfileProps {
  sportsList: SportsListData;
}

export default function Subscribe({ sportsList }: DataProfileProps) {
  const { isLogged } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const { setToastMessage, setToastDuration } = useToast();

  useLoggedRedirect();

  // Si l'utilisateur est déjà inscrit on lui indique un message
  if (isLogged) {
    return <p>Vous êtes connecté.</p>;
  }

  const handleCreate = async (fullUserData: FullUserData) => {
    try {
      // Appel à la fonction modifyOneUser pour mettre à jour les données utilisateur
      const response = await createOneUser(fullUserData);

      if (response.success) {
        setToastMessage(`Bienvenue ${fullUserData.userName}, vous pouvez vous connecter avec vos identifants`);
        setToastDuration(7000);
        router.push('/connexion');
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création du profil :');
    }
  };

  // On initialise les données de profil publiques à blanc
  const nullUserPublicData = {
    id: '',
    userName: '',
    dateOfBirth: '',
    gender: '',
    region: '',
    city: '',
    createdAt: '',
    isAdmin: false,
    description: '',
    favoriteSports: [],
  };

  return (
    <>
      <Head>
        <title>Inscription - osport</title>
      </Head>
      <div className="flex flex-col space- w-screen">
        <div className="text-2xl font-sans font-bold ml-24 border mt-7">
          <h1> Inscription </h1>
        </div>
        {/* Utilisation du composant UserProfileForm */}
        <div className=" max-w-md mt-6">
          <UserProfileForm
            isEdit={false} // Il s'agit d'une création de profil
            userData={nullUserPublicData}// Pas de données utilisateur à afficher
            sportsList={sportsList}
            onSubmit={handleCreate} // Fonction de rappel pour traiter les données soumises
          />
          {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer les données publiques.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getSportsServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
