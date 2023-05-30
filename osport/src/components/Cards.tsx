import { useState, useEffect } from 'react';
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
        <div className="mb-5 mt-5 grid gap-y-10 gap-x-6 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-y-10 gap-x-6 grid-cols-4">
          {events.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
