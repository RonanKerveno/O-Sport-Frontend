// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { GetServerSidePropsContext } from 'next';
import { UserPublicData } from '../types';
import { getUserById } from '../services/userService';

// Typage des données reçues par l'API
interface UserServerSideProps {
  userData: UserPublicData;
}

const getPrivateServerSideProps = async (context: GetServerSidePropsContext):
  Promise<UserServerSideProps> => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    throw new Error('User ID is invalid');
  }

  // On lance la requête API.
  const userResponse = await getUserById(userId);

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userResponse.success) {
    throw new Error('User not found');
  }

  return {
    userData: userResponse.user,
  };
};

export default getPrivateServerSideProps;
