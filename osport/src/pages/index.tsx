// Page Home

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import {
  SetStateAction, useCallback, useEffect, useState,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import InfoPanel from '@/components/InfoPanel';
import Cards from '@/components/Cards';
import SportSearch from '@/components/SportSearch';
import { EventData, SportsListData } from '@/types';
import Link from 'next/link';

interface EventsDataProps {
  eventList: EventData;
  sportsList: SportsListData;
}

export default function Home({ eventList, sportsList }: EventsDataProps) {
  const {
    isAdmin, isLogged, showLoggedStatus, setShowLoggedStatus,
  } = useAuth();
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(null);

  // On affiche un message juste après la redirection depuis une page de connexion/déconnexion.
  const {
    toastMessage, toastDuration, setToastMessage, setToastDuration,
  } = useToast();

  useEffect(() => {
    if (showLoggedStatus) {
      const message = isLogged ? 'Vous êtes connecté' : 'Vous êtes déconnecté';
      setToastMessage(message);
      // Réinitialisation de l'état après l'affichage du message
      setShowLoggedStatus(false);
      setToastDuration(1000);
    } else if (toastMessage) {
      toast(toastMessage);
      // Réinitialisation du message après l'affichage du toast
      setToastMessage('');
    }
  }, [
    isLogged,
    setShowLoggedStatus,
    showLoggedStatus,
    toastMessage,
    setToastMessage,
    setToastDuration,
  ]);

  const onSelectSport = useCallback((sportId: SetStateAction<string | null>) => {
    setSelectedSportId(sportId);
    const selectedSport = sportsList.find((sport) => sport.id === sportId);
    setSelectedSportName(selectedSport ? selectedSport.name : null);
  }, [sportsList]);

  const filteredEventList = selectedSportId ? eventList.filter(
    (event) => event.sportId === selectedSportId,
  )
    : eventList;

  const resetFilter = useCallback(() => {
    setSelectedSportId(null);
    setSelectedSportName(null);
  }, []);

  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div>
        <InfoPanel />
        {isAdmin
          && (
            <div className="my-4 ml-7">
              Admin : <Link href="/sports" className=" text-red-500 font-semibold">modification des sports</Link>
            </div>
          )}
        <div className="font-bold text-center">
          <h2 className="text-xl mb-14 uppercase">Les événements sportifs {selectedSportName && `[${selectedSportName}]`}</h2>
          {selectedSportName && (
            <div className="text-center">
              <button
                type="button"
                onClick={resetFilter}
                className="mt-4 border text-sm bg-blue-700 hover:bg-blue-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
              >
                Réinitialiser le filtre
              </button>
            </div>
          )}
        </div>
        <div>
          <Cards
            events={filteredEventList}
          />
          <SportSearch sports={sportsList} onSelectSport={onSelectSport} />
        </div>

      </div>
      <ToastContainer autoClose={toastDuration} />
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste de événements.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const eventsProps = await getEventsServerSideProps();

    // Pas besoin de trier ici car déjà trié par getAllEvents

    // Récupérer uniquement les sports (avec id et name) associés à un événement
    const sports = eventsProps.eventList.map((event) => (
      { id: event.sportId, name: event.sport.name }));

    // Créer un Set à partir de ces noms pour éliminer les doublons
    const uniqueSports = Array.from(new Set(sports.map((sport) => sport.name)))
      .map((name) => sports.find((sport) => sport.name === name));

    return {
      props: {
        eventList: eventsProps.eventList,
        sportsList: uniqueSports,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
