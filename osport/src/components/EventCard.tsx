// Composant gérant l'affichage d'une carte d'événement.

import { HiUserGroup } from 'react-icons/hi2';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Event } from '@/types';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import Avvvatars from 'avvvatars-react';

// Typage des props
interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Formatage date et l'heure.
  const startingTime = format(parseISO(event.startingTime), 'dd/MM/yyyy HH:mm');
  // Recupération de l'icône correspondant au sport de l'événement.
  const SportIcon = sportIconMap[sportNameConvert(event.sport.name)] || sportIconMap.Sports;

  return (
    // La carte est encapsulée dans un lien pointant vers l'événement.
    <Link href={`/evenement/${event.id}`}>
      <div className="flex flex-col bg-clip-border rounded-xl bg-slate-200 text-gray-900 shadow-md transform motion-safe:hover:scale-105 duration-300">
        <div className="flex justify-end p-4">
          <div className="flex flex-col">
            <HiUserGroup size={30} />
            <div>{event.eventUsers.length}/{event.maxNbParticipants}</div>
          </div>
        </div>
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden flex justify-center items-center bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 h-16 w-16">
          <SportIcon size={24} />
        </div>
        <div className="mx-5">
          <h3 className="font-bold line-clamp-1">{event.title}</h3>
          <div className="flex flex-col gap-2 border-t-2 border-b-2 border-slate-400 py-4 mt-4">
            <div className="line-clamp-1">{event.city}</div>
            <div className="font-semibold">{startingTime}</div>
          </div>
          <div className="mt-2 text-slate-500 line-clamp-1">
            Sport : <span className="text-slate-700">{event.sport.name}</span>
          </div>
          <div className="mt-7 flex justify-center items-baseline">
            <div className="flex justify-center mb-4">
              {/* génération automatique d'un avatar à partir du nom d'utilisateur */}
              <Avvvatars value={event.creator.userName} />
            </div>
            <div className="ml-2 flex justify-center line-clamp-1">
              {event.creator.userName}
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}
