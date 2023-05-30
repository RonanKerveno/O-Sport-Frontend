// Page affichant un événement

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { HiUserCircle, HiUserGroup } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un événement en fonction de son ID
export default function Event() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { id } = router.query;
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
    <>
      <Head>
        <title>Evénement {id} - osport</title>
      </Head>
      <div>
        {events.map((event, id) => (
          <><div className=" mb-1 text-[#b430a6] text-center"><h1>{event.title}</h1></div><div>
            <div className=" mb-1 bg-white text-gray-700 shadow-md ">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <HiUserGroup className="text-5xl mr-3" />
                  <span className="text-xl">0/{event.maxNbParticipants}</span>
                </span>
                <span className="text-right"><MdSportsHandball size={50} /></span>
              </div>
              <div className="text-center text-4xl font-bold p-6">{event.title}</div>
              <div className="text-left mb-1">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" type="submit">
                  S'inscrire
                </button>
              </div>
            </div>
            <div className=" mb-1 p-8 bg-white text-gray-700 shadow-md">
              <div className="mt-2 mb-2">{event.city}</div>
              <div className="mt-2 mb-2">{event.street}</div>
              <div className="mt-2 mb-2">{event.startingTime}</div>
              <div className="mt-2 mb-2">{event.sport.name}</div>
            </div>

            <div className=" mb-1 p-6 bg-white text-gray-700 shadow-md">
              <span className="text-2xl">Description de l'événement :</span> <br />
              <br />
              {event.description}
            </div>

            <div className=" mb-1 flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
              <span>Participant à l'événement :</span>
              <span className="flex flex-col items-center">
                <HiUserCircle size={30} />
                <span>Bilou</span>
              </span>
            </div>
            <div className=" flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
              <span>Créateur de l'évènement :</span>
              <span className="flex flex-col items-center">
                <HiUserCircle size={30} />
                <span>{event.creator.userName}</span>
              </span>
            </div>
                                                                                               </div>
          </>
        ))}
      </div>
    </>

  );
}
