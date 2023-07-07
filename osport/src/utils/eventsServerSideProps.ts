// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { EventData } from '@/types';
import { getAllEvents } from '@/services/eventService';

// Typage des données reçues par l'API
interface EventsServerSideProps {
  eventList: EventData;
}

// Déclaration de l'interface pour le type du paramètre 'options'
interface GetEventsServerSidePropsOptions {
  pastEvents?: boolean;
}

// Récupérations de la liste des événements.
const getEventsServerSideProps = async (options: GetEventsServerSidePropsOptions = {}):
Promise<EventsServerSideProps> => {
  // On lance les requêtes API.
  const eventsResponse = await getAllEvents({ pastEvents: options.pastEvents });

  // On retourne des tableaux vides en cas d'echec de la requête.
  return {
    eventList: eventsResponse.success ? eventsResponse.events : [],
  };
};

export default getEventsServerSideProps;
