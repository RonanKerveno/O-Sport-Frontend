import { EventData } from '@/types';
import Card from './Card';

interface CardsProps {
  events: EventData;
}

export default function Cards({ events }: CardsProps) {
  if (!events) {
    return <div>Pas d&#39;événements disponibles</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-14">
        {events.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
