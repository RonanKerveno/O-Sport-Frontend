// Page de modification d'un événement

import React, { useState } from 'react';
import Head from 'next/head';
import getEventServerSideProps from '@/utils/eventServerSideProps';
import { useRouter } from 'next/router';
import { EditEventData, Event, SportsListData } from '@/types';
import { deleteOneEvent, updateOneEvent } from '@/services/eventService';
import EventEditForm from '@/components/EventEditForm';
import { GetServerSideProps } from 'next';

interface DataProfileProps {
  eventData: Event;
}

export default function EditEvent({ eventData }: DataProfileProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const eventId = eventData.id;

  const handleUpdate = async (modifiedEventData: EditEventData) => {
    try {
      const response = await updateOneEvent(eventId, modifiedEventData);

      if (response.success) {
        // Redirection vers la page de connexion
        router.push(`/evenement/${eventId}`);
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la modification');
    }
  };

  // Confirmation demandée avant suppresion du profil
  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  // Appel API pour supprimer le profil
  const confirmDelete = async () => {
    try {
      // Appel à la fonction deleteOneEvent pour supprimer les données
      // de l'événement
      const response = await deleteOneEvent(eventId);

      if (response.success) {
        window.location.href = '/';
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la suppression');
    }
  };

  const sportsList: SportsListData = [];

  return (
    <>
      <Head>
        <title>Modifiez votre événement</title>
      </Head>
      <div className="flex flex-col space-">
        <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
          <h1> Modifiez votre événement </h1>
        </div>

        <EventEditForm
          isEdit
          eventData={eventData}
          sportsList={sportsList}
          onSubmit={handleUpdate}
        />
        {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
      </div>
      <div className="my-10 mx-4">
        <p className="mb-3">Vous souhaitez annuler ?</p>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleDelete}
        >
          Annuler l&#39;événement
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p className="mb-3">Êtes-vous sûr de vouloir annuler l&#39;événement ?</p>
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
                onClick={confirmDelete}
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

// Traitement des requête API coté SSR pour récupérer les données.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getEventServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
