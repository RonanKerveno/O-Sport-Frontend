// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { UserPublicData, UserPrivateData } from '../types';
import { getUserById, getUserByIdPrivate } from '../services/userService';

// Typage des données reçues par l'API
interface UserServerSideProps {
  userData: UserPublicData;
  userPrivateData: UserPrivateData;
}

// Récupérations des données publiques de l'utilisateur.
const getPrivateServerSideProps = async (context: GetServerSidePropsContext):
  Promise<UserServerSideProps> => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    throw new Error('User ID is invalid');
  }

  // On analyse tous les cookies de la requête entrante
  const cookies = parseCookies(context);
  // Extraction du cookie "token"
  const { token } = cookies;

  // On lance les requêtes API.
  const userResponse = await getUserById(userId);
  // On joint le contenu du jeton extrait du cookie pour que la fonction
  // getUserByIdPrivate puisse le mettre dans le header lors de la requête API
  const userPrivateResponse = await getUserByIdPrivate(userId, token);

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userResponse.success) {
    throw new Error('User not found');
  }

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userPrivateResponse.success) {
    throw new Error('Private user data not found');
  }

  return {
    userData: userResponse.user,
    userPrivateData: userPrivateResponse.userPrivate,
  };
};

export default getPrivateServerSideProps;
