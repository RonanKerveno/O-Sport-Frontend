// Page affichant un événement

/* eslint-disable react/no-unescaped-entities */
import { HiUserCircle, HiUserGroup } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';
import Head from 'next/head';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
import getEventServerSideProps from '@/utils/eventServerSideProps';
import { format, parseISO } from 'date-fns';
import router from 'next/router';

interface DataProfileProps {
  eventData: Event;
}

// Visualisation d'un événement en fonction de son ID
export default function EventDetails({ eventData }: DataProfileProps) {
  const startingTime = format(parseISO(eventData.startingTime), 'dd/MM/yyyy HH:mm');
  const endingTime = format(parseISO(eventData.endingTime), 'dd/MM/yyyy HH:mm');
  const { userId } = useAuth();

  return (
    <>
      <Head>
        <title>{eventData.title} - osport</title>
      </Head>
      <div>
        <div className=" mb-1 bg-white text-gray-700 shadow-md ">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <HiUserGroup className="text-5xl mr-3" />
              <span className="text-xl">{`${eventData.eventUsers.length}/${eventData.maxNbParticipants}`}</span>
            </span>
            <span className="text-right"><MdSportsHandball size={50} /></span>
          </div>
          <div className="text-center text-4xl font-bold p-6">{eventData.title}</div>
          <div className="text-left mb-1">
            {userId === eventData.creatorId ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                type="button"
                onClick={() => router.push(`/evenement/${eventData.id}/modifier`)}
              >
                Modifier
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                type="button"
              >
                S'inscrire
              </button>
            )}
          </div>
        </div>
        <div className=" mb-1 p-8 bg-white text-gray-700 shadow-md">
          <div className="mt-2 mb-2">{eventData.city}</div>
          <div className="mt-2 mb-2">{eventData.street}</div>
          <div className="mt-2 mb-2">{startingTime}</div>
          <div className="mt-2 mb-2">{endingTime}</div>
          <div className="mt-2 mb-2">{eventData.sport.name}</div>
        </div>

        <div className=" mb-1 p-6 bg-white text-gray-700 shadow-md">
          <span className="text-2xl">Description de l'événement :</span> <br />
          <br />
          {eventData.description}
        </div>

        <div className=" mb-1 flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Participant à l'événement :</span>
          {eventData.eventUsers.map((user) => (
            <div key={user.id} className="flex flex-col items-center">
              <HiUserCircle size={30} />
              <span>{user.userName}</span>
            </div>
          ))}
        </div>
        <div className=" flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Créateur de l'évènement :</span>
          <div className="flex flex-col items-center">
            <HiUserCircle size={30} />
            <span>{eventData.creator.userName}</span>
          </div>
        </div>
      </div>
    </>

  );
}

// Appel vers la fonction spéciale ServerSideProps Next.js qui s'exécute coté serveur (SSR).
// Elle permet de récupérer les données de l'API avant de rendre la page.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getEventServerSideProps(context);
    return { props };
    // Si ID mal typé ou introuvable on renvoit vers la page 404.
  } catch (error) {
    return { notFound: true };
  }
};
