// Page de modification d'un événement

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import getEventServerSideProps from '@/utils/eventServerSideProps';
import router from 'next/router';
import { EditEventData, Event, SportsListData } from '@/types';
import { deleteOneEvent, updateOneEvent } from '@/services/eventService';
import EventEditForm from '@/components/EventEditForm';
import { GetServerSideProps } from 'next';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { isPast } from 'date-fns';

// Typage des données reccueillies en SSR
interface DataProfileProps {
  eventData: Event;
}

export default function EditEvent({ eventData }: DataProfileProps) {
  // Chargement de la liste des sports comme un tableau vide car on ne recupère pas les données.
  // Par design la modification d'événement ne doit pas permettre de modifier le sport, qui est le
  // "coeur" de l'événement.
  const sportsList: SportsListData = [];

  // Context gérant les paramètres du toaster.
  const { setToastMessage, setToastDuration } = useToast();

  // Récupération de l'ID de l'événement pour le modifier ou le supprimer.
  const eventId = eventData.id;

  // Gestion de la modification de l'événement.

  // State gérant les messages d'erreurs lors de l'édition de l'événement.
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction gérant la modification de l'événement via l'API.
  const handleUpdate = async (modifiedEventData: EditEventData) => {
    try {
      const response = await updateOneEvent(eventId, modifiedEventData);

      if (response.success) {
        // Si OK redirection vers la page de l'evenenement avec un message toaster.
        setToastMessage('Évènement modifié');
        setToastDuration(1000);
        router.push(`/evenement/${eventId}`);
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la modification');
    }
  };

  // Gestion de la suppression de l'événement.

  // State gérant le statut de la demande de confirmation de l'action.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Confirmation demandée avant suppresion de l'événement
  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  // Appel API pour supprimer l'événement
  const confirmDelete = async () => {
    try {
      // Appel à la fonction deleteOneEvent pour supprimer les données
      // de l'événement
      const response = await deleteOneEvent(eventId);

      if (response.success) {
        setToastMessage('Évènement supprimé !');
        setToastDuration(1000);
        router.push('/');
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la suppression');
    }
  };

  // Vérification des autorisations

  // On vérifie si l'événement est passé (considéré comme passé si sa date début est antérieure à
  // la date actuelle)
  const isEventPast = isPast(new Date(eventData.startingTime));

  // Appel au Context pour obtenir l'ID de l'utilisateur connecté et son statut Admin.
  const { userId, isAdmin } = useAuth();

  // State gérant le statut de l'autorisation de l'utilisateur pour éditer l'événement.
  const [isAuthorized, setIsAuthorized] = useState(false);

  // State gérant le statut du chargement pendant les vérifications d'autorisation.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect gérant la vérification de l'autorisation de l'utilisateur quand à
  // l'événement visé.
  useEffect(() => {
    // Vérification de l'égalité des Id. Si l'ID de l'utilisateur connecté ne matche pas avec l'ID
    // du créateur de l'évenement et que l'utilisateur n'est pas admin on redirige vers Home.
    // Dans tous les cas si l'événement est passé et que l'utilisateur n'est pas admin on redirige
    // également.
    if ((userId !== eventData.creatorId || isEventPast) && !isAdmin) {
      router.push('/');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [userId, isAdmin, eventData.creatorId, isEventPast]);

  if (isLoading) {
    // Pendant que nous vérifions l'authentification, nous affichons ce message
    return <h1>Verification en cours...</h1>;
  } if (!isAuthorized) {
    // Si l'utilisateur n'est pas autorisé, nous affichons ce message
    return <h1>Non autorisé !</h1>;
  }
  return (
    <>
      <Head>
        <title>Modificaton de l&#39;événement</title>
      </Head>
      <section>
        <div className="flex justify-center md:block mb-10">
          <Link
            href={`/evenement/${eventId}`}
            className="bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 font-bold text-white px-4 py-2 rounded"
          >
            Retour sur l&#39;événement
          </Link>
        </div>
        <div className="flex justify-center items-center gap-3 mb-10">
          <FaEdit size={24} />
          <h1 className={`text-2xl text-center font-bold uppercase ${isAdmin && userId !== eventData.creatorId ? 'text-red-500' : ''}`}>
            {isAdmin && userId !== eventData.creatorId ? 'Modification Admin' : 'Modifier l\'événement'}
          </h1>
        </div>

        <EventEditForm
          isEdit
          eventData={eventData}
          sportsList={sportsList}
          onSubmit={handleUpdate}
        />
        {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
        <div className="my-10 text-center">
          <p className="mb-3">La sortie n&#39;est plus possible ?</p>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 transition-colors duration-1000 text-white font-bold px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Annuler l&#39;événement
          </button>
        </div>
        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white m-2 p-4 rounded">
              <p className="mb-3">Êtes-vous sûr de vouloir annuler l&#39;événement ?</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 transition-colors duration-1000 text-gray-800 px-4 py-2 rounded mr-2"
                  onClick={() => setShowConfirmation(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 transition-colors duration-1000 text-white font-bold px-4 py-2 rounded"
                  onClick={confirmDelete}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer les données de l'événements.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getEventServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
