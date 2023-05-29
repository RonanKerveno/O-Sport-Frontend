// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { GetServerSidePropsContext } from 'next';
import { UserPublicData, EventData } from '@/types';
import { getOneUser, getAllEventsFromOneUser, getAllEventsCreatedByOneUser } from '../services/userService';

// Typage des données reçues par l'API
interface UserServerSideProps {
  userData: UserPublicData;
  userEvents: EventData;
  createdEvents: EventData;
}

// Récupérations des données publiques de l'utilisateur.
const getUserServerSideProps = async (context: GetServerSidePropsContext):
Promise<UserServerSideProps> => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    throw new Error('User ID is invalid');
  }

  // On lance les requêtes API.
  const userResponse = await getOneUser(userId);
  const userEventsResponse = await getAllEventsFromOneUser(userId);
  const createdEventsResponse = await getAllEventsCreatedByOneUser(userId);

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userResponse.success) {
    throw new Error('User not found');
  }

  // On retourne des tableaux vides en cas d'echec des requêtes retournant des listes.
  return {
    userData: userResponse.user,
    userEvents: userEventsResponse.success ? userEventsResponse.events : [],
    createdEvents: createdEventsResponse.success ? createdEventsResponse.createdEvents : [],
  };
};

export default getUserServerSideProps;
