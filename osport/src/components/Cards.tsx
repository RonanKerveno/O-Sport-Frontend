import { useMediaQuery } from 'usehooks-ts';
import { EventData } from '@/types';
import Card from './Card';

interface CardsProps {
  events: EventData;
}

export default function Cards({ events }: CardsProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!events) {
    return <div>Pas d&#39;événements disponibles</div>;
  }

  return (
    <div>
      {isMobile ? (
        <div className="mb-5 mt-5 grid gap-y-10 gap-x-6 md:grid-cols-2 h-72 overflow-auto ">
          {events.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="ml-6 min-[1540px]:w-[1200px] min-[1650px]:w-[1280px] mt-2 grid gap-y-10 gap-x-6 grid-cols-4 p-8 shadow-md rounded-md border border-gray-400">
          {events.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
