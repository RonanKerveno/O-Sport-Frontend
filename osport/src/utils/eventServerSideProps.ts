// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.

import { Event } from '@/types';
import { getOneEvent } from '@/services/eventService';
import { GetServerSidePropsContext } from 'next';

// Typage des données reçues par l'API
interface EventsServerSideProps {
  eventData: Event;
}

// Récupération de la liste des événements.
const getEventServerSideProps = async (context: GetServerSidePropsContext):
  Promise<EventsServerSideProps> => {
  const eventId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof eventId !== 'string') {
    throw new Error('Event ID is invalid');
  }

  // On lance les requêtes API.
  const eventResponse = await getOneEvent(eventId);

  return {
    eventData: eventResponse.event,
  };
};

export default getEventServerSideProps;
