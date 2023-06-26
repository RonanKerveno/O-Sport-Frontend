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
import EventCards from '@/components/EventCards';
import SportFilter from '@/components/SportFilter';
import { EventData } from '@/types';
import { CgScrollH } from 'react-icons/cg';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import router from 'next/router';

// Typage des données reccueillies en SSR
interface EventsDataProps {
  eventList: EventData;
  sportsList: {
    id: string;
    name: string;
    count?: number;
  }[];
}

export default function Home({ eventList, sportsList }: EventsDataProps) {
  // Gestion des messages toaster

  // Récupération du statut de l'utilisateur connecté via le Context d'authentification.
  const {
    isAdmin, isLogged, showLoggedStatus, setShowLoggedStatus,
  } = useAuth();
  const {
    toastMessage, toastDuration, setToastMessage, setToastDuration,
  } = useToast();
  // useEffect gérant les actions d'affichage des messages toaster.
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

  // Gestion des filtres par sport

  // States gérant l'ID et le nom du sport séléctionné
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [selectedSportName, setSelectedSportName] = useState<string | null>(null);

  // Fonction liée à la sélection d'un sport.
  const onSelectSport = useCallback((sportId: SetStateAction<string | null>) => {
    setSelectedSportId(sportId);
    // On cherche les données du sport séléctionné dans la liste de sportList
    const selectedSport = sportsList.find((sport) => sport.id === sportId);
    setSelectedSportName(selectedSport ? selectedSport.name : null);
  }, [sportsList]);

  // On filtre dans la liste des événements ceux dont l'ID du sport associé
  // correspond à l'ID sport séléctionné.
  const filteredEventList = selectedSportId ? eventList.filter(
    (event) => event.sportId === selectedSportId,
  )
    : eventList;

  // On récupère l'icône à afficher à coté du titre du sport séléctionné.
  const getSportIcon = (sportName: string | null) => {
    // On définit notre composant d'icône par rapport au sport séléctionné.
    const IconComponent = sportName ? sportIconMap[sportNameConvert(sportName)]
      || sportIconMap.Sports : sportIconMap.Sports;
    return <IconComponent size={32} />;
  };

  // State gérant le reset du filtre par sport
  const [resetFilter, setResetFilter] = useState(false);
  // Fonction gérant le reset du filtre de sport.
  const resetFilterCallback = useCallback(() => {
    setSelectedSportId(null);
    setSelectedSportName(null);
    setResetFilter(true);
  }, []);

  // Gestion du nombre d'évenements à afficher

  // Nombre d'événements à afficher par défaut
  const eventsPerPage = 10;

  // State de gestion du compteur d'événements à afficher.
  const [displayedEventsCount, setDisplayedEventsCount] = useState(eventsPerPage);
  // Incrémentation du compteur (quand on clique sur "voir plus")
  const increaseDisplayedEventsCount = () => {
    setDisplayedEventsCount((prevCount) => prevCount + eventsPerPage);
  };

  // On définit une variable pour limiter le nombre d'événements affichés à la valeur du compteur.
  const displayedEvents = filteredEventList.slice(0, displayedEventsCount);

  // Fonction de reset du compteur pour revenir au nombre initial d'événements à afficher.
  const resetDisplayedEventsCount = () => {
    setDisplayedEventsCount(eventsPerPage);
  };

  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>

      {/* Appel au composant panneau d'information */}
      <section className="mt-4">
        <InfoPanel />
        {/* Option de modification à destination de l'administrateur */}
        {isAdmin
          && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.push('/sports')}
                className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-4 rounded mb-10"
              >
                Modification Admin des sports
              </button>
            </div>
          )}
      </section>

      <div className="font-bold text-center">
        <h2 className="text-xl mb-7 uppercase text-slate-900">Les événements sportifs</h2>
      </div>
      <p className="text-center font-semibold text-slate-800">Filtrer par sport</p>
      <div className="flex justify-center"><CgScrollH size={32} /></div>
      {/* Appel au composant barre de recherche des sports */}
      <SportFilter
        sports={sportsList}
        onSelectSport={onSelectSport}
        resetFilter={resetFilter}
        setResetFilter={setResetFilter}
      />

      <section className="my-4">
        <div className="text-center font-bold text-[#264b81] text-xl uppercase">
          {/* Si un sport est sélectionné on affiche son nom et l'icône asociée */}
          {selectedSportName
            ? (
              <div className="flex justify-center items-center gap-3">
                {getSportIcon(selectedSportName)} {selectedSportName}
              </div>
            )
            : 'Tous les sports'}
        </div>
        {/* Si un sport est sélectionné on affiche un bouton pour rénitialiser le filtrage */}
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
          {/* Appel au composant affichant les cartes d'événements */}
          <EventCards
            events={displayedEvents}
          />
        </div>
        <div className="flex justify-center gap-4">
          {/* Si le compteur d'évenements affichés est inférieur au nombre total d'évenements on
          ajoute un bouton "voir plus" */}
          {displayedEventsCount < filteredEventList.length && (
            <button
              type="button"
              onClick={increaseDisplayedEventsCount}
              className="bg-[#264b81] hover:bg-[#07252e] text-sm text-white py-2 px-4 rounded mt-14"
            >
              Voir plus
            </button>
          )}
          {/* Si le compteur d'évenements affichés est supérieur au nombre par défaut d'evenements
          à afficher on ajouter un bouton pour revenir à l'affichage par défaut */}
          {displayedEventsCount > eventsPerPage && (
            <button
              type="button"
              onClick={resetDisplayedEventsCount}
              className="bg-[#264b81] hover:bg-[#07252e] text-sm text-white py-2 px-4 rounded mt-14"
            >
              Limiter l&#39;affichage
            </button>
          )}
        </div>
      </section>

      {/* Appel au composant toaster */}
      <ToastContainer autoClose={toastDuration} />
    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste des événements.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const eventsProps = await getEventsServerSideProps();

    // Récupération des sports (avec id et name) associés à un événement
    const sports = eventsProps.eventList.map((event) => (
      { id: event.sportId, name: event.sport.name }));

    // Comptage du nombre d'événements par sport
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
