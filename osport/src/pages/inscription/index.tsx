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
import { FaUser } from 'react-icons/fa';

// Typage des données :
// - Données utilisateur
type FullUserData = UserPublicData & UserPrivateData;
// - Liste des sports recueillie en SSR
interface DataProfileProps {
  sportsList: SportsListData;
}

export default function Subscribe({ sportsList }: DataProfileProps) {
  // Context gérant les paramètres du toaster.
  const { setToastMessage, setToastDuration } = useToast();

  // State gérant les messages d'erreurs lors de la création du profil.
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction gérant la demande de création du nouvel utilisateur.
  const handleCreate = async (fullUserData: FullUserData) => {
    try {
      const response = await createOneUser(fullUserData);

      // Si la création est OK on redirige vers la page de connexion en progammant un message sur
      // le toaster.
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

  // Appel au Hook personnalisé de redirection vers Home si l'utilisateur est déjà connecté
  useLoggedRedirect();

  // Appel au Context d'authentification pour determiner si l'utilisateur est déjà loggué.
  const { isLogged } = useAuth();

  // Si l'utilisateur est déjà loggué (donc inscrit) on rend juste un message.
  // Utile en complément de "useLoggedRedirect" car le composant est rendu avant que la redirection
  // ne soit effective.
  if (isLogged) {
    return (
      <section>
        <h1 className="text-green-700 font-bold text-xl">Vous êtes connectés !</h1>
      </section>
    );
  }

  // On initialise les données de profil publiques à blanc car le composant UserProfileForm sert à
  // l'inscription et à la modification de profil : donc il a besoin de données de départ.
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
      <section>
        <div className="flex justify-center items-center gap-3 mt-2 mb-10">
          <FaUser size={24} />
          <h1 className="text-2xl text-center font-bold uppercase"> Inscription </h1>
        </div>
        {/* Appel au composant UserProfileForm */}
        <div>
          <UserProfileForm
            isEdit={false} // Il s'agit d'une création de profil
            userData={nullUserPublicData} // Pas de données utilisateur à afficher
            sportsList={sportsList}
            onSubmit={handleCreate}
          />
          {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        </div>
      </section>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste des sports.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const sportsListData = await getSportsServerSideProps();
    return { props: sportsListData };
  } catch (error) {
    return { notFound: true };
  }
};
