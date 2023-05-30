/* eslint-disable import/no-extraneous-dependencies */
// Page Home

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import { useMediaQuery } from 'usehooks-ts';
import {
  SetStateAction, useCallback, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import Description from '@/components/Description';
import Footer from '@/components/Footer';
import Cards from '@/components/Cards';
import SportSearch from '@/components/SportSearch';
import { EventData, SportsListData } from '@/types';
import Link from 'next/link';

interface EventsDataProps {
  eventList: EventData;
  sportsList: SportsListData;
}

export default function Home({ eventList, sportsList }: EventsDataProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    isAdmin, isLogged, showLoggedStatus, setShowLoggedStatus,
  } = useAuth();
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(null);

  // On affiche un message juste après la redirection depuis une page de connexion/déconnexion.
  useEffect(() => {
    if (showLoggedStatus) {
      const message = isLogged ? 'Vous êtes connecté' : 'Vous êtes déconnecté';
      toast(message);

      // Réinitialisation de l'état après l'affichage du message
      setShowLoggedStatus(false);
    }
  }, [isLogged, setShowLoggedStatus, showLoggedStatus]);

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
      <div className="flex flex-col flex-wrap bg-slate-100 w-full h-full justify-center items-center">
        <Description />
        {isAdmin
          && (
            <div className="my-7">
              Admin : <Link href="/sports" className=" text-red-500 font-semibold">modification des sports</Link>
            </div>
          )}
        <div className="font-bold text-slate-700 text-2xl m-8">
          <h2>Les événements sportifs {selectedSportName && `[${selectedSportName}]`}</h2>
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
        {isMobile ? (
          <div className="">
            <Cards
              events={filteredEventList}
            />
            <div>
              <SportSearch sports={sportsList} onSelectSport={onSelectSport} />
            </div>
            <Footer />
          </div>
        ) : (
          <div className="flex flex-row m-2">
            <Cards
              events={filteredEventList}
            />
            <SportSearch sports={sportsList} onSelectSport={onSelectSport} />
          </div>
        )}

      </div>
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste de événements.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const eventsProps = await getEventsServerSideProps();

    // Trier les événements par date de début
    const sortedEventList = eventsProps.eventList.sort((a, b) => new Date(
      a.startingTime,
    ).getTime() - new Date(b.startingTime).getTime());

    // Récupérer uniquement les sports (avec id et name) associés à un événement
    const sports = sortedEventList.map((event) => ({ id: event.sportId, name: event.sport.name }));

    // Créer un Set à partir de ces noms pour éliminer les doublons
    const uniqueSports = Array.from(new Set(sports.map((sport) => sport.name)))
      .map((name) => sports.find((sport) => sport.name === name));

    return {
      props: {
        eventList: sortedEventList,
        sportsList: uniqueSports,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
