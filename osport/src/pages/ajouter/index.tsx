// Page de création d'un événement

import React, { useState } from 'react';
import Head from 'next/head';
import getSportsServerSideProps from '@/utils/sportsServerSideProps';
import router from 'next/router';
import { EditEventData, SportsListData } from '@/types';
import { createOneEvent } from '@/services/eventService';
import { useAuth } from '@/contexts/AuthContext';
import EventEditForm from '@/components/EventEditForm';
import { GetServerSideProps } from 'next';
import { useToast } from '@/contexts/ToastContext';
import { FaPlusCircle } from 'react-icons/fa';

// Typage des données reccueillies en SSR
interface DataProfileProps {
  sportsList: SportsListData;
}

export default function AddEvent({ sportsList }: DataProfileProps) {
  // State gérant les messages d'erreurs lors de la création de l'événement.
  const [errorMessage, setErrorMessage] = useState('');

  // Appel au Context d'authentification pour récupérer l'ID de l'utilisateur connecté.
  const { userId } = useAuth();

  // Context gérant les paramètres du toaster.
  const { setToastMessage, setToastDuration } = useToast();

  // Fonction gérant la demande de création du nouvel utilisateur.
  const handleCreate = async (eventData: EditEventData) => {
    if (userId === null) {
      setErrorMessage('User ID is null');
      return;
    }
    try {
      const response = await createOneEvent(userId, eventData);

      // Si la création est OK on redirige vers la page du nouvel événement en progammant un message
      // sur le toaster.
      if (response.success) {
        setToastMessage('Évènement Créé !');
        setToastDuration(1000);
        router.push(`/evenement/${response.event.eventId}`);
        // Redirection
      } else if ('error' in response && response.error !== undefined) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la création de l'évènement");
    }
  };

  // On initialise les données d'événement à blanc car le composant EventEditForm sert à créer et
  // modifier un événement : donc il a besoin de données de départ.
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
      <section>
        <div className="flex justify-center items-center gap-3 mt-2 mb-10">
          <FaPlusCircle size={24} />
          <h1 className="text-2xl text-center font-bold uppercase"> Nouvel événement </h1>
        </div>
        {/* Appel au composant EventEditForm */}
        <EventEditForm
          isEdit={false} // Il s'agit d'une création d'événement
          eventData={nullEventData} // Pas de données utilisateur à afficher
          sportsList={sportsList}
          onSubmit={handleCreate}
        />
        {errorMessage && <p className="text-red-500 mt-3 ml-4">{errorMessage}</p>}
      </section>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste des sports.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const props = await getSportsServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
