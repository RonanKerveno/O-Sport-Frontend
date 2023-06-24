// Page de modification du profil

import { GetServerSideProps } from 'next';
import router from 'next/router';
import getProfileServerSideProps from '@/utils/profileServerSideProps';
import { deleteOneUser, updateOneUser } from '@/services/userService';
import UserProfileForm from '@/components/UserProfileForm';
import { UserPublicData, UserPrivateData, SportsListData } from '@/types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Head from 'next/head';
import { FaUserEdit } from 'react-icons/fa';

// Typage des données :
// - Données utilisateur
type FullUserData = UserPublicData & UserPrivateData;
// - Données publiques utilisateur et liste des sports reccueillies en SSR
interface EditProfileProps {
  userData: UserPublicData;
  sportsList: SportsListData;
}

export default function EditProfile({ userData, sportsList }: EditProfileProps) {
  // Appel au Context pour obtenir l'ID de l'utilisateuir connecté et son statut Admin.
  const { userId, isAdmin } = useAuth();

  // Context gérant les paramètres du toaster.
  const { setToastMessage, setToastDuration } = useToast();

  // Edition du profil

  // State gérant les messages d'erreurs lors de l'édition du profil.
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction gérant la mise à jour du profil avec les données du formulaire.
  const handleUpdate = async (fullUserData: FullUserData): Promise<void> => {
    try {
      // Appel à la fonction modifyOneUser pour mettre à jour les données utilisateur
      const response = await updateOneUser(fullUserData);

      if (response.success) {
        setToastMessage('Profil modifié');
        setToastDuration(1000);
        router.push(`/profil/${userData.id}`);
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la mise à jour du profil :');
    }
  };

  // Suppression du profil

  // State gérant le statut de la demande de confirmation de l'action.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Confirmation demandée avant suppresion du profil
  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  // Appel API pour supprimer le profil
  const confirmDelete = async () => {
    if (userId === null) {
      setErrorMessage('Erreur : votre identifiant est inconnu.');
    } else {
      try {
        // Appel à la fonction deleteOneUser pour supprimer les données utilisateur
        // et son cookie d'authentification.
        const response = await deleteOneUser(userData.id, userId, isAdmin);

        if (response.success) {
          window.location.href = '/';
        } else if ('error' in response && response.error !== undefined) {
          setErrorMessage(response.error);
        }
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la suppression du profil :');
      }
    }
  };

  // Vérification des autorisations de l'utilisateur avant le rendu.

  // State gérant le statut de l'autorisation de l'utilisateur pour éditer le profil.
  const [isAuthorized, setIsAuthorized] = useState(false);

  // State gérant le statut du chargement pendant les vérifications d'autorisation.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect gérant la vérification de l'autorisation de l'utilisateur quand au
  // profil visé.
  useEffect(() => {
    // Vérification de l'égalité des userId. Si l'ID de l'utilisateur connecté ne matche pas
    // avec l'ID du profil visé et que l'utilisateur n'est pas admin on redirige vers Home.
    if (userId !== userData.id && !isAdmin) {
      router.push('/');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [userId, userData, isAdmin]);

  if (isLoading) {
    // Pendant que nous vérifions l'authentification, nous affichons ce message
    return <h1>Verification en cours...</h1>;
  } if (!isAuthorized) {
    // Si l'utilisateur n'est pas autorisé, nous affichons ce message
    return <h1>Non autorisé !</h1>;
  }

  // Si l'utilisateur est autorisé, nous rendons la page de profil
  return (
    <>
      <Head>
        <title>Modification du profil - osport</title>
      </Head>
      <section className="px-4">
        <div className="flex justify-center items-center gap-3 mt-2 mb-10">
          <FaUserEdit size={24} />
          <h1 className={`text-2xl text-center font-bold uppercase ${isAdmin && userId !== userData.id ? 'text-red-500' : ''}`}>
            {isAdmin && userId !== userData.id ? 'Modification Admin' : 'Modifier mon profil'}
          </h1>
        </div>
        <UserProfileForm
          isEdit
          userData={userData}
          sportsList={sportsList}
          onSubmit={handleUpdate}
        />
        {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        <div className="my-10 text-center">
          <p className="mb-3">Vous souhaitez nous quitter ?</p>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Se désinscrire
          </button>
        </div>
        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white m-2 p-4 rounded">
              <p className="mb-3">Êtes-vous sûr de vouloir supprimer votre profil ?</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                  onClick={() => setShowConfirmation(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={confirmDelete}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer les données publiques et la liste des sports.
// (Les props contiennent userData et sportsList)
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getProfileServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
