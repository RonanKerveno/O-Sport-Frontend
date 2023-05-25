// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { SportsListData } from '../types';
import { getAllSports } from '../services/sportService';

// Typage des données reçues par l'API
interface sportsListServerSideProps {
  sportsList: SportsListData;
}

const getSportsServerSideProps = async ():
  Promise<sportsListServerSideProps> => {
  // On lance la requête API.
  const sportsResponse = await getAllSports();

  // Si la liste de sports n'est pas trouvé on redirige vers la page 404
  if (!sportsResponse.success) {
    throw new Error('Sports list not found');
  }

  return {
    sportsList: sportsResponse.sports,
  };
};

export default getSportsServerSideProps;
