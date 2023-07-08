// Composant gérant l'affichage de l'agenda des evenements d'un utilisateur.

import { EventData } from '@/types';
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import EventCards from './EventCards';

// Typage des Props
interface UserAgendaProps {
  events: EventData;
}

export default function UserAgenda({ events }: UserAgendaProps) {
  // State pour gérer l'affichage des événements à venir ou de tous les événements
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);

  // Filtrage retirant les événements dont la date/heure de fin est passée
  const upcomingEvents = events.filter((event) => {
    const endingTime = new Date(event.endingTime).getTime();
    return endingTime > Date.now();
  });

  // Filtrage pour lister les événements dont la date/heure de fin est dans le passé
  const pastEvents = events.filter((event) => {
    const endingTime = new Date(event.endingTime).getTime();
    return endingTime <= Date.now();
  });

  // Tri des événements par ordre de date de début
  const sortedEvents = (showUpcomingEvents ? upcomingEvents : events).sort((a, b) => {
    const aTime = new Date(a.startingTime).getTime();
    const bTime = new Date(b.startingTime).getTime();
    return aTime - bTime;
  });

  return (
    <div className="mb-10">
      <div className="flex justify-center items-center gap-3 p-4 mb-4">
        <div><FaCalendar size={32} /></div>
        <h2 className="text-lg font-bold uppercase">
          {showUpcomingEvents ? 'Evénements à venir' : 'Tous les événements'}
        </h2>
      </div>
      {pastEvents.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            className="mb-12 border text-SM bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => setShowUpcomingEvents(!showUpcomingEvents)}
          >
            {showUpcomingEvents ? 'Voir passés' : 'Voir à venir'}
          </button>
        </div>
      )}
      {/* On retourne chaque évenement en reprenant les données de events */}
      {sortedEvents.length > 0 ? (
        <EventCards events={sortedEvents} />
      ) : (
        <p className="text-center text-gray-500">Rien de prévu pour le moment !</p>
      )}
    </div>
  );
}
