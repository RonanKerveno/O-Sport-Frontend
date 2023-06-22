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
import { EventData } from '@/types';
import Link from 'next/link';
import { CgScrollH } from 'react-icons/cg';

interface EventsDataProps {
  eventList: EventData;
  sportsList: {
    id: string;
    name: string;
    count?: number;
  }[];
}

export default function Home({ eventList, sportsList }: EventsDataProps) {
  const eventsPerPage = 2;
  const [displayedEventsCount, setDisplayedEventsCount] = useState(eventsPerPage);
  const {
    isAdmin, isLogged, showLoggedStatus, setShowLoggedStatus,
  } = useAuth();
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(null);

  const increaseDisplayedEventsCount = () => {
    setDisplayedEventsCount((prevCount) => prevCount + eventsPerPage);
  };

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

  // Utilisez displayedEventsCount pour limiter les événements affichés
  const displayedEvents = filteredEventList.slice(0, displayedEventsCount);

  const resetDisplayedEventsCount = () => {
    setDisplayedEventsCount(eventsPerPage);
  };

  const [resetFilter, setResetFilter] = useState(false);

  const resetFilterCallback = useCallback(() => {
    setSelectedSportId(null);
    setSelectedSportName(null);
    setResetFilter(true);
  }, []);

  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="mx-4 mt-14">
        <InfoPanel />
        {isAdmin
          && (
            <div className="my-4 ml-7">
              Admin : <Link href="/sports" className=" text-red-500 font-semibold">modification des sports</Link>
            </div>
          )}
        <div className="font-bold text-center">
          <h2 className="text-xl mb-7 uppercase text-slate-900">Les événements sportifs</h2>
        </div>
      </div>
      <p className="text-center font-semibold text-slate-800">Sports proposés</p>
      <div className="flex justify-center"><CgScrollH size={32} /></div>
      <SportSearch
        sports={sportsList}
        onSelectSport={onSelectSport}
        resetFilter={resetFilter}
        setResetFilter={setResetFilter}
      />
      <div className="m-4">
        <div className=" text-center font-bold text-[#264b81] text-xl uppercase">
          {selectedSportName || 'Tous les sports'}
        </div>
        {selectedSportName && (
          <div className="text-center">
            <button
              type="button"
              onClick={resetFilterCallback}
              className="mt-5 border text-sm bg-[#264b81] hover:bg-[#3b9dbb] transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            >
              Réinitialiser le filtre
            </button>
          </div>
        )}
        <div className="mt-12">
          <Cards
            events={displayedEvents}
          />
        </div>
        <div className="flex justify-around">
          {displayedEventsCount < filteredEventList.length && (
            <button
              type="button"
              onClick={increaseDisplayedEventsCount}
              className="bg-[#264b81] hover:bg-[#07252e] text-sm text-white py-2 px-4 rounded mt-14"
            >
              Voir plus
            </button>
          )}
          {displayedEventsCount > eventsPerPage && (
            <button
              type="button"
              onClick={resetDisplayedEventsCount}
              className="bg-[#264b81] hover:bg-[#07252e] text-sm text-white py-2 px-4 rounded mt-14"
            >
              Réinitialiser l&#39;affichage
            </button>
          )}
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

    // Récupérer uniquement les sports (avec id et name) associés à un événement
    const sports = eventsProps.eventList.map((event) => (
      { id: event.sportId, name: event.sport.name }));

    // Compter le nombre d'événements par sport
    const sportsWithCounts = sports.reduce((acc: {
      id: string, name: string, count: number
    }[], sport) => {
      const existingSport = acc.find((s) => s.id === sport.id);
      if (existingSport) {
        existingSport.count += 1;
      } else {
        acc.push({ ...sport, count: 1 });
      }
      return acc;
    }, []);

    return {
      props: {
        eventList: eventsProps.eventList,
        sportsList: sportsWithCounts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
