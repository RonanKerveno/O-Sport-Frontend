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
import { useState } from 'react';
import { addOneUserToOneEvent, deleteOneUserFromOneEvent } from '@/services/userService';
import Link from 'next/link';

interface DataProfileProps {
  eventData: Event;
}

// Visualisation d'un événement en fonction de son ID
export default function EventDetails({ eventData }: DataProfileProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState<'subscribe' | 'unsubscribe' | null>(null);
  const startingTime = format(parseISO(eventData.startingTime), 'dd/MM/yyyy HH:mm');
  const endingTime = format(parseISO(eventData.endingTime), 'dd/MM/yyyy HH:mm');
  const { userId, isAdmin } = useAuth();

  const handleSubscribe = () => {
    setActionType('subscribe');
    setShowConfirmation(true);
  };

  const handleUnsubscribe = () => {
    setActionType('unsubscribe');
    setShowConfirmation(true);
  };

  const confirmAction = async () => {
    if (userId === null) {
      setErrorMessage('Une erreur est survenue');
      return;
    }
    try {
      let response;
      if (actionType === 'subscribe') {
        response = await addOneUserToOneEvent(userId, eventData.id);
      } else {
        response = await deleteOneUserFromOneEvent(userId, eventData.id);
      }

      if (response.success) {
        window.location.href = `/evenement/${eventData.id}`;
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue');
    }
  };

  // Vérifie si l'utilisateur est inscrit à l'événement
  const isUserRegistered = eventData.eventUsers.find((user) => user.id === userId) !== undefined;

  const renderButton = () => {
    if (userId === eventData.creatorId) {
      return (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={() => router.push(`/evenement/${eventData.id}/modifier`)}
        >
          Modifier
        </button>
      );
    } if (isUserRegistered) {
      return (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={handleUnsubscribe}
        >
          Se désinscrire
        </button>
      );
    } if (userId) {
      return (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={handleSubscribe}
        >
          S'inscrire
        </button>
      );
    }
    return null;
  };

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
            {renderButton()}
          </div>
          {isAdmin && (userId !== eventData.creatorId) && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
              type="button"
              onClick={() => router.push(`/evenement/${eventData.id}/modifier`)}
            >
              Modification Admin
            </button>
          )}
          {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        </div>
        <div className=" mb-1 p-8 bg-white text-gray-700 shadow-md">
          <div className="mt-2 mb-2">{eventData.city}</div>
          <div className="mt-2 mb-2">{eventData.street}</div>
          <div className="mt-2 mb-2">{startingTime}</div>
          <div className="mt-2 mb-2">{endingTime}</div>
          <div className="mt-2 mb-2">{eventData.sport && eventData.sport.name ? eventData.sport.name : 'sport inconnu' }</div>
        </div>

        <div className=" mb-1 p-6 bg-white text-gray-700 shadow-md">
          <span className="text-2xl">Description de l'événement :</span> <br />
          <br />
          {eventData.description}
        </div>

        <div className=" mb-1 flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Participant à l'événement :</span>
          {eventData.eventUsers.map((user) => (
            <Link href={`/profil/${user.id}`} key={user.id} className="flex flex-col items-center hover:scale-105 transition-transform duration-200">
              <HiUserCircle size={30} />
              <span>{user.userName}</span>
            </Link>
          ))}
        </div>
        <div className=" flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Créateur de l'évènement :</span>
          <Link href={`/profil/${eventData.creatorId}`} className="flex flex-col items-center hover:scale-105 transition-transform duration-200">
            <HiUserCircle size={30} />
            <span>{eventData.creator.userName}</span>
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p className="mb-3">
              {actionType === 'subscribe'
                ? 'Êtes-vous sûr de vouloir vous inscrire à cet événement ?'
                : 'Êtes-vous sûr de vouloir vous désinscrire de cet événement ?'}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={() => setShowConfirmation(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmAction}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
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
