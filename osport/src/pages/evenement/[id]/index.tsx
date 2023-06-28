// Page affichant un événement

/* eslint-disable react/no-unescaped-entities */
import { HiUserGroup, HiUserPlus, HiDocumentText } from 'react-icons/hi2';
import Head from 'next/head';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
import getEventServerSideProps from '@/utils/eventServerSideProps';
import { format, parseISO } from 'date-fns';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { addOneUserToOneEvent, deleteOneUserFromOneEvent } from '@/services/userService';
import Link from 'next/link';
import { useToast } from '@/contexts/ToastContext';
import { toast, ToastContainer } from 'react-toastify';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import Avvvatars from 'avvvatars-react';

// Typage des données reccueillies en SSR
interface DataProfileProps {
  eventData: Event;
}

// Visualisation d'un événement en fonction de son ID
export default function EventDetails({ eventData }: DataProfileProps) {
  // Récupération des infos sur l'utilisateur connecté via le Context d'authentification.
  const { userId, isAdmin } = useAuth();

  // Gestion de l'inscription et la désinscription

  // State gérant le type d'action relative à l'événement : inscription ou désinscription.
  const [actionType, setActionType] = useState<'subscribe' | 'unsubscribe' | null>(null);

  // State gérant la confirmation de la désinscription.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fonction gérant l'inscription
  const handleSubscribe = () => {
    setActionType('subscribe');
    setShowConfirmation(true);
  };

  // Fonction gérant la désinscription
  const handleUnsubscribe = () => {
    setActionType('unsubscribe');
    setShowConfirmation(true);
  };

  // State gérant les erreurs lors de la récupération des données.
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction gérant les requêtes d'insription et désinscription.
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

  // Vérification de l'inscription de l'utilisateur à l'événement
  const isUserRegistered = eventData.eventUsers.find((user) => user.id === userId) !== undefined;

  // Définition conditionnelle des boutons à afficher
  const renderButton = () => {
    if (userId === eventData.creatorId) {
      return (
        <button
          className="bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={() => router.push(`/evenement/${eventData.id}/modifier`)}
        >
          Modifier
        </button>
      );
    } if (isUserRegistered) {
      return (
        <button
          className="bg-red-500 hover:bg-red-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={handleUnsubscribe}
        >
          Se désinscrire
        </button>
      );
    } if (userId && eventData.eventUsers.length >= eventData.maxNbParticipants) {
      return (
        <button
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          disabled
        >
          Complet
        </button>
      );
    } if (userId) {
      return (
        <button
          className="bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1"
          type="button"
          onClick={handleSubscribe}
        >
          S'inscrire
        </button>
      );
    }
    return null;
  };

  // Gestion du Toaster

  // Context gérant les paramètres du toaster.
  const { setToastMessage, toastMessage, toastDuration } = useToast();
  // useEffect gérant les actions d'affichage des messages toaster.
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
      // Réinitialisation du message après l'affichage du toast
      setToastMessage('');
    }
  }, [toastMessage, setToastMessage]);

  // Autres variables liées au rendu

  // Récupération de l'icône correspondant au sport de l'événement.
  const SportIcon = sportIconMap[sportNameConvert(eventData.sport.name)] || sportIconMap.Sports;

  // Formatage des dates du format ISO en format local.
  const startingTime = format(parseISO(eventData.startingTime), 'dd/MM/yyyy HH:mm');
  const endingTime = format(parseISO(eventData.endingTime), 'dd/MM/yyyy HH:mm');

  return (
    <>
      <Head>
        <title>{eventData.title} - osport</title>
      </Head>
      <section className="">
        <div className=" mb-3 bg-slate-200 text-gray-700 rounded-md shadow-md p-2">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <HiUserGroup size={42} />
              <span className="text-xl">{`${eventData.eventUsers.length}/${eventData.maxNbParticipants}`}</span>
            </div>
            <span className="text-right p-2"><SportIcon size={50} /></span>
          </div>
          <h1 className="text-center text-2xl font-bold uppercase p-6">{eventData.title}</h1>
          <div className="text-left mb-1">
            {renderButton()}
          </div>
          {isAdmin && (userId !== eventData.creatorId) && (
            <button
              className="bg-red-500 hover:bg-red-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1"
              type="button"
              onClick={() => router.push(`/evenement/${eventData.id}/modifier`)}
            >
              Modification Admin
            </button>
          )}
          {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        </div>

        <div className=" mb-3 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
          <div className="mb-4 flex items-center gap-2 font-bold text-xl">
            <HiUserPlus size={22} />
            <h2>Créateur de l'évenement</h2>
          </div>
          <Link href={`/profil/${eventData.creatorId}`} className="flex items-center gap-2 w-fit hover:scale-105 transition-transform duration-200">
            <Avvvatars value={eventData.creator.userName} size={38} />
            <p className="text-lg font-medium">{eventData.creator.userName}</p>
          </Link>
        </div>

        <div className=" mb-3 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
          <div className="mb-4 flex items-center gap-2 font-bold text-xl">
            <SportIcon size={28} />
            <h2>{eventData.sport && eventData.sport.name ? eventData.sport.name : 'Sport inconnu'}</h2>
          </div>
          <div className="md:flex md:items-center md:gap-2 mb-3 md:mb-2">
            <p className="mb-2 md:mb-0 font-semibold text-lg">{eventData.city}</p>
            <p className="hidden md:block"> - </p>
            <p className="font-medium">{eventData.street}</p>
          </div>
          <div className="md:flex md:gap-2">
            <p className="hidden md:block font-semibold">Début :</p>
            <p className="mb-2 md:mb-0">{startingTime}</p>
            <p className="hidden md:block">-</p>
            <p className="hidden md:block font-semibold">Fin :</p>
            <p>{endingTime}</p>
          </div>
        </div>

        <div className=" mb-3 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
          <div className="mb-4 flex items-center gap-2 font-bold text-xl">
            <HiDocumentText size={22} />
            <h2>Description</h2>
          </div>
          <p>{eventData.description}</p>
        </div>

        <div className="px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
          <div className="mb-4 flex items-center gap-2 font-bold text-xl">
            <HiUserGroup size={22} />
            <h2>Participants</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {eventData.eventUsers.map((user) => (
              <Link href={`/profil/${user.id}`} key={user.id} className="flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-200">
                <Avvvatars value={user.userName} />
                <p className="text-sm">{user.userName}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
      <ToastContainer autoClose={toastDuration} />
    </>

  );
}

// Traitement des requête API coté SSR pour récupérer les donnée d'un événement.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getEventServerSideProps(context);
    return { props };
    // Si ID mal typé ou introuvable on renvoit vers la page 404.
  } catch (error) {
    return { notFound: true };
  }
};
