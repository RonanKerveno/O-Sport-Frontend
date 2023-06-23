// Composant gérant l'affichage des cartes d'événements.

import { EventData } from '@/types';
import EventCard from './EventCard';

// Typage des props
interface EventCardsProps {
  events: EventData;
}

export default function EventCards({ events }: EventCardsProps) {
  if (!events) {
    return <div>Aucun événement disponible</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-14">
        {events.map((event) => (
          // Appel au composant d'affichage d'une carte
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
