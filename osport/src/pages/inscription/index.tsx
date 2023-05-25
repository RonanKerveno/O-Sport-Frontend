// Page d'inscription au site

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import getSportsServerSideProps from '@/utils/sportsServerSideProps';
import { SportsListData, UserPrivateData, UserPublicData } from '@/types';
import { createOneUser } from '@/services/userService';
import router from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import useLoggedRedirect from '../../hooks/useLoggedRedirect';
import UserProfileForm from '../../components/UserProfileForm';

type FullUserData = UserPublicData & UserPrivateData;

interface DataProfileProps {
  sportsList: SportsListData;
}

export default function Subscribe({ sportsList }: DataProfileProps) {
  const { isLogged } = useAuth();

  useLoggedRedirect();

  // Si l'utilisateur est déjà inscrit on lui indique un message
  if (isLogged) {
    return <p>Vous êtes déjà connecté.</p>;
  }

  const handleCreate = async (fullUserData: FullUserData) => {
    console.log(fullUserData);
    try {
      // Appel à la fonction modifyOneUser pour mettre à jour les données utilisateur
      const response = await createOneUser(fullUserData);

      if (response.success) {
        // Redirection vers la page de connexion
        router.push('/connexion');
      } else {
        // Gestion des erreurs lors de la mise à jour
        console.log('Une erreur est survenue lors de la mise à jour du profil.');
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la mise à jour du profil :', error);
    }
  };

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
      <div className="flex flex-col space-">
        <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
          <h1> Inscription </h1>
        </div>
        {/* Utilisation du composant UserProfileForm */}
        <UserProfileForm
          isEdit={false} // Il s'agit d'une création de profil
          userData={nullUserPublicData}// Pas de données utilisateur à afficher
          sportsList={sportsList}
          onSubmit={handleCreate} // Fonction de rappel pour traiter les données soumises
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getSportsServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
