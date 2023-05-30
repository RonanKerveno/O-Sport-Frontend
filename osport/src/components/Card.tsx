/* eslint-disable react/no-unescaped-entities */
// Composant d'affichage d'une carte événement
import { HiUser, HiUserGroup } from 'react-icons/hi2';
import { MdSportsBasketball } from 'react-icons/md';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { useState, useEffect } from 'react';

export default function Card({ event }) {
  const [events, setEvents] = useState([]); // Liste des IDs des cards à afficher
  console.log(event);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const deleteHandle = function (id) { // Remplacez par votre propre token
    fetch(`https://dev1.keronn.net/events/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Inclure les cookies dans la requête

    })
      .then(() => console.log('Suppression réussie'))
      .catch((error) => console.error('Erreur lors de la suppression de l\'événement :', error));
  };

  useEffect(() => {
    fetch('https://dev1.keronn.net/events')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
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
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="flex justify-end p-4">
            <div className="flex flex-col">
              <HiUserGroup size={30} />
              <div>0/{event.maxNbParticipants}</div>
            </div>
          </div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <Link href={`/evenement/:${event.id}`}><MdSportsBasketball /></Link>
          </div>
          <div className="ml-5 mr-5">
            <div key={event.id}>
              <div>{event.title}</div>
              <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
                <div>{event.city}</div>
                <div className="font-bold">{event.startingTime}</div>
              </div>
              <div className="mt-4 mb-2 flex flex-row justify-center">
                <div className="flex justify-center mb-4">
                  <HiUser size={30} color="black" />
                </div>
                <div className="ml-2 flex justify-center">{event.creator.userName}</div>

                {event.creatorId === 1 && (
                <button onClick={() => deleteHandle(event.id)} type="submit">
                  Supprimer
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transform motion-safe:hover:scale-110 duration-300">
          <div className="flex justify-end p-4">
            <div className="flex flex-col">
              <HiUserGroup size={30} />
              <div>5/23</div>
            </div>
          </div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <Link href={`/evenement/:${event.id}`}><MdSportsBasketball /></Link>
          </div>
          <div className="ml-5 mr-5">
            <div key={event.id}>
              <div>{event.title}</div>
              <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
                <div>{event.city}</div>
                <div className="font-bold">{event.startingTime}</div>
              </div>
              <div className="mt-4 mb-2 flex flex-row justify-center">
                <div className="flex justify-center mb-4">
                  <HiUser size={30} color="black" />
                </div>
                <div className="ml-2 flex justify-center">{event.creator.userName}</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
