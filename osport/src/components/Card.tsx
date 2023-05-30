import { HiUser, HiUserGroup } from 'react-icons/hi2';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { format, parseISO } from 'date-fns';
import { Event } from '@/types';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';

interface CardProps {
  event: Event;
}

export default function Card({ event }: CardProps) {
  const isMobile = useMediaQuery('(max-width: 320px)');

  // Formatage date et l'heure.
  const startingTime = format(parseISO(event.startingTime), 'dd/MM/yyyy HH:mm');

  const SportIcon = sportIconMap[sportNameConvert(event.sport.name)] || sportIconMap.Sports;

  return (
    <Link href={`/evenement/${event.id}`}>
      {isMobile ? (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="flex justify-end p-4">
            <div className="flex flex-col">
              <HiUserGroup size={30} />
              <div>{event.eventUsers.length}/{event.maxNbParticipants}</div>
            </div>
          </div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <SportIcon size={24} />
          </div>
          <div className="ml-5 mr-5">
            {event.title}
            <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
              <div>{event.city}</div>
              <div className="font-bold">{startingTime}</div>
            </div>
            <div className="mt-2 text-slate-500">
              Sport : <span className="text-slate-700">{event.sport.name}</span>
            </div>
            <div className="mt-4 mb-2 flex flex-row justify-center">
              <div className="flex justify-center mb-4">
                <HiUser size={30} color="black" />
              </div>
              <div className="ml-2 flex justify-center">
                {event.creator.userName}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transform motion-safe:hover:scale-110 duration-300 h-72">
          <div className="flex justify-end p-4">
            <div className="flex flex-col">
              <HiUserGroup size={30} />
              <div>{event.eventUsers.length}/{event.maxNbParticipants}</div>
            </div>
          </div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <SportIcon size={24} />
          </div>
          <div className="ml-5 mr-5">
            {event.title}
            <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
              <div>{event.city}</div>
              <div className="font-bold">{startingTime}</div>
            </div>
            <div className="mt-2 text-slate-500">
              Sport : <span className="text-slate-700">{event.sport.name}</span>
            </div>
            <div className="mt-4 mb-2 flex flex-row justify-center">
              <div className="flex justify-center mb-4">
                <HiUser size={30} color="black" />
              </div>
              <div className="ml-2 flex justify-center">
                {event.creator.userName}
              </div>
            </div>

          </div>
        </div>
      )}
    </Link>
  );
}
