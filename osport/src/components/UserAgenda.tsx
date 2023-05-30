// Composant gérant l'affichage de l'agenda des evenements d'un utilisateur.

import { EventData } from '@/types';
import Card from './Card';

// Typage TypeScript
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
    <div className="pr-4 mb-10">
      <h2 className="font-bold my-2 rounded-xl bg-white text-gray-700 shadow-md p-4 ml-4 text-center">Agenda :</h2>
      {/* On retourne chaque évenement en reprenant les données de events */}
      <div className="flex flex-wrap justify-around gap-7 mx-4 mt-10">
        {sortedEvents.map((event) => (
          <div key={event.id} className="sm:w-1/2 md:w-60 text-center">
            <Card event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
