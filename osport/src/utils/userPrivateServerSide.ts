// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { GetServerSidePropsContext } from 'next';
import { UserPublicData, UserPrivateData } from '../types';
import { getUserById, getUserByIdPrivate } from '../services/userService';

// Typage des données reçues par l'API
interface UserServerSideProps {
  userData: UserPublicData;
  userPrivateData: UserPrivateData;
}

const getPrivateServerSideProps = async (context: GetServerSidePropsContext):
  Promise<UserServerSideProps> => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    throw new Error('User ID is invalid');
  }

  // Récupération du cookie dans l'objet 'req' de 'context' (objet fournit par Next.js).
  // Comme on est en SSR on est obligé de récupérer le cookie via le contexte de Next pour le
  // transmettre manuelement dans la reqûete
  const { cookie } = context.req.headers;

  // On lance les requêtes API.
  const userResponse = await getUserById(userId);
  // Passer le cookie à getUserByIdPrivate
  const userPrivateResponse = await getUserByIdPrivate(userId, cookie);

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
