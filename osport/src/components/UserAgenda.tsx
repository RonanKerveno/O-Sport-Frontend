// Composant gérant l'affichage de l'agenda des evenements d'un utilisateur.

import { format } from 'date-fns';
import { EventData } from '../types';

// Typage TypeScript
interface UserAgendaProps {
  events: EventData;
}

export default function UserAgenda({ events }: UserAgendaProps) {
  // Tri des événements par ordre de date de début
  const sortedEvents = events.sort((a, b) => {
    const aTime = new Date(a.startingTime).getTime();
    const bTime = new Date(b.startingTime).getTime();
    return aTime - bTime;
  });

  return (
    <div>
      <h2 className="font-bold mb-2">Agenda :</h2>
      {/* On retourne chaque évenement en reprenant les données de events */}
      {sortedEvents.map((event) => {
        const startingDate = format(new Date(event.startingTime), 'dd/MM/yyyy HH:mm');
        const endingDate = format(new Date(event.endingTime), 'dd/MM/yyyy HH:mm');

        return (
          <div key={event.id} className="mb-3">
            <h3 className="font-medium">{`${startingDate} à ${endingDate}`}</h3>
            <p className="font-medium">{event.title}</p>
            <p>Sport : {event.sport.name}</p>
            <p>Ville : {event.city}</p>
            <p>Créé par : {event.creator.userName}</p>
          </div>
        );
      })}
    </div>
  );
}
