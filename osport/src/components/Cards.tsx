import { useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import Card from './Card';

export default function Cards() {
  const [events, setEvents] = useState([]);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    fetch('https://dev1.keronn.net/events')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('La réponse de l\'API ne contient pas un tableau d\'événements valide');
        }
      })
      .catch((error) => console.error('Erreur lors de la récupération des événements :', error));
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="mb-5 mt-5 grid gap-y-10 gap-x-6 md:grid-cols-2">
          {events.map((event, id) => (
            <Card key={'cards-'+id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-y-10 gap-x-6 grid-cols-4">
          {events.map((event, id) => (
            <Card key={'cards-'+id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
