// Page de création d'un événement

import React, { useState } from 'react';
import Head from 'next/head';
import getSportsServerSideProps from '@/utils/sportsServerSideProps';
import { useRouter } from 'next/router';
import { EditEventData, SportsListData } from '@/types';
import { createOneEvent } from '@/services/eventService';
import { useAuth } from '@/contexts/AuthContext';
import EventEditForm from '@/components/EventEditForm';
import { GetServerSideProps } from 'next';
import Description from '@/components/Description';

interface DataProfileProps {
  sportsList: SportsListData;
}

export default function AddEvent({ sportsList }: DataProfileProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = useAuth();

  const handleCreate = async (eventData: EditEventData) => {
    if (userId === null) {
      setErrorMessage('User ID is null');
      return;
    }
    try {
      const response = await createOneEvent(userId, eventData);

      if (response.success) {
        // Redirection vers la page de connexion
        router.push('/connexion');
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création du profil :');
    }
  };

  // On initialise les données de profil publiques à blanc
  const nullEventData: EditEventData = {
    title: '',
    region: '',
    zipCode: '',
    city: '',
    street: '',
    description: '',
    startingTime: '',
    endingTime: '',
    sportId: '',
    sport: {
      name: '',
    },
    maxNbParticipants: 0,
  };

  return (
    <>
      <Head>
        <title>Créez votre événement</title>
      </Head>
      <Description />
      <div className="flex flex-col space-">
        <Description />
        <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
          <h1> Créez votre événement </h1>
        </div>

        <EventEditForm
          isEdit={false}
          eventData={nullEventData}
          sportsList={sportsList}
          onSubmit={handleCreate}
        />
        {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
      </div>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer les données publiques.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getSportsServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
