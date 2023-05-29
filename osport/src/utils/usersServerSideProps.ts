// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { UserPublicData } from '@/types';
import { getAllUsers } from '@/services/userService';

// Typage des données reçues par l'API
interface UserServerSideProps {
  usersData: UserPublicData;
}

// Récupérations des données publiques de l'utilisateur.
const getUsersServerSideProps = async ():
Promise<UserServerSideProps> => {
  // On lance les requêtes API.
  const usersResponse = await getAllUsers();

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!usersResponse.success) {
    throw new Error('Users not found');
  }

  // On retourne la réponse.
  return {
    usersData: usersResponse.user,
  };
};

export default getUsersServerSideProps;
