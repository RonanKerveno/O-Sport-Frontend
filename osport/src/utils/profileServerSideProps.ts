// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { GetServerSidePropsContext } from 'next';
import { UserPublicData, SportsListData } from '../types';
import { getOneUser } from '../services/userService';
import { getAllSports } from '../services/sportService';

// Typage des données reçues par l'API
interface ProfileServerSideProps {
  userData: UserPublicData;
  sportsList: SportsListData;
}

const getProfileServerSideProps = async (context: GetServerSidePropsContext):
  Promise<ProfileServerSideProps> => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    throw new Error('User ID is invalid');
  }

  // On lance la requête API.
  const userResponse = await getOneUser(userId);
  const sportsResponse = await getAllSports();

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userResponse.success) {
    throw new Error('User not found');
  }

  // Si la liste de sports n'est pas trouvé on redirige vers la page 404
  if (!sportsResponse.success) {
    throw new Error('Sports list not found');
  }

  return {
    userData: userResponse.user,
    sportsList: sportsResponse.sports,
  };
};

export default getProfileServerSideProps;
