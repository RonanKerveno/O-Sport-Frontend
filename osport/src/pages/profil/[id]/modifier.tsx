// Page de modification du profil

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import getProfileServerSideProps from '@/utils/profileServerSideProps';
import { deleteOneUser, updateOneUser } from '@/services/userService';
import UserProfileForm from '@/components/UserProfileForm';
import { UserPublicData, UserPrivateData, SportsListData } from '@/types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Typage TypeScript
type FullUserData = UserPublicData & UserPrivateData;

interface EditProfileProps {
  userData: UserPublicData;
  sportsList: SportsListData;
}

export default function EditProfile({ userData, sportsList }: EditProfileProps) {
  const router = useRouter();
  const { userId, isAdmin } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérification de l'égalité des userId
    if (userId !== userData.id && !isAdmin) {
      router.push('/');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [userId, userData, router, isAdmin]);

  // Appel API pour traiter la mise à jour du profil avec les données du formulaire.
  const handleUpdate = async (fullUserData: FullUserData): Promise<void> => {
    try {
      // Appel à la fonction modifyOneUser pour mettre à jour les données utilisateur
      const response = await updateOneUser(fullUserData);

      if (response.success) {
        router.push(`/profil/${userData.id}`);
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la mise à jour du profil :');
    }
  };

  // Confirmation demandée avant suppresion du profil
  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  // Appel API pour supprimer le profil
  const confirmDelete = async () => {
    try {
      // Appel à la fonction deleteOneUser pour supprimer les données utilisateur
      // et son cookie d'anthentification.
      const response = await deleteOneUser(userData.id);

      if (response.success) {
        window.location.href = '/';
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la suppression du profil :');
    }
  };

  if (isLoading) {
    // Pendant que nous vérifions l'authentification, nous affichons ce message
    return <h1>Verification en cours...</h1>;
  } if (!isAuthorized) {
    // Si l'utilisateur n'est pas autorisé, nous affichons ce message
    return <h1>Non autorisé !</h1>;
  }
  // Si l'utilisateur est autorisé, nous rendons la page de profil
  return (
    <div className="container mx-auto px-4">
      <h1 className={`text-2xl font-bold my-4 ${isAdmin && userId !== userData.id ? 'text-red-500' : ''}`}>
        {isAdmin && userId !== userData.id ? 'Modification Admin' : 'Modifier mon profil'}
      </h1>
      <UserProfileForm isEdit userData={userData} sportsList={sportsList} onSubmit={handleUpdate} />
      {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
      <div className="my-10 mx-4">
        <p className="mb-3">Vous souhaitez nous quitter ?</p>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleDelete}
        >
          Se désinscrire
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
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
    </div>
  );
}

// Traitement des requête API coté SSR pour récupérer les données publiques.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getProfileServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
