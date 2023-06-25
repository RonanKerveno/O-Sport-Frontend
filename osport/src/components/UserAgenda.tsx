// Composant gérant l'affichage de l'agenda des evenements d'un utilisateur.

import { EventData } from '@/types';
import { FaCalendar } from 'react-icons/fa';
import EventCard from './EventCard';

// Typage des Props
interface UserAgendaProps {
  events: EventData;
}

export default function UserAgenda({ events }: UserAgendaProps) {
  // Filtrage des événements dont la date/heure de fin est passée
  const upcomingEvents = events.filter((event) => {
    const endingTime = new Date(event.endingTime).getTime();
    return endingTime > Date.now();
  });

  // Tri des événements par ordre de date de début
  const sortedEvents = upcomingEvents.sort((a, b) => {
    const aTime = new Date(a.startingTime).getTime();
    const bTime = new Date(b.startingTime).getTime();
    return aTime - bTime;
  });

  return (
    <div className="mb-10">
      <div className="flex justify-center items-center gap-3 p-4 mb-10">
        <div><FaCalendar size={32} /></div>
        <h2 className="font-bold uppercase">
          Evénéments à venir
        </h2>
      </div>
      {/* On retourne chaque évenement en reprenant les données de events */}
      <div className="flex flex-col gap-7">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Rien de prévu pour le moment !</p>
        )}
      </div>
    </div>
  );
}
