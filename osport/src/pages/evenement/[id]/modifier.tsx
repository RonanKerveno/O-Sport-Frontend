// Page de modification d'un événement

import React, { useState } from 'react';
import Head from 'next/head';
import getEventServerSideProps from '@/utils/eventServerSideProps';
import { useRouter } from 'next/router';
import { EditEventData, Event, SportsListData } from '@/types';
import { updateOneEvent } from '@/services/eventService';
import EventEditForm from '@/components/EventEditForm';
import { GetServerSideProps } from 'next';

interface DataProfileProps {
  eventData: Event;
}

export default function EditEvent({ eventData }: DataProfileProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async (modifiedEventData: EditEventData) => {
    const eventId = eventData.id;
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
