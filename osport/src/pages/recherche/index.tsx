// Page de recherche d'événements

import { useEffect, useRef, useState } from 'react';
import { EventData } from '@/types';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import EventSearchForm from '@/components/EventSearchForm';
import EventCards from '@/components/EventCards';
import EventKeywordSearch from '@/components/EventKeyWordSearch';
import router from 'next/router';
import { FaSearch } from 'react-icons/fa';

// Typage des données reccueillies en SSR
interface EventsDataProps {
  eventList: EventData;
}

export default function SearchEvent({ eventList }: EventsDataProps) {
  const [form, setForm] = useState({
    searchType: '',
    region: '',
    zipCode: '',
    city: '',
    sport: '',
    startDateTime: '',
    endDateTime: '',
  });

  // State gérant les listes d'événements filtrés.
  const [filteredEvents, setFilteredEvents] = useState<EventData>(eventList);

  // State gérant le statut de lancement d'une recherche.
  const [hasSearched, setHasSearched] = useState(false);

  // State gérant les mots clés saisis pour la recherche.
  const [keyword, setKeyword] = useState('');

  // Fonction gérant la recherche par filtrage de la liste des événements renvoyés par l'API.
  // Il s'agit donc d'une recherche purement frontend.
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    let updatedEvents = [...eventList];

    // Recherche par type de lieu
    if (form.searchType) {
      updatedEvents = updatedEvents.filter((event) => {
        switch (form.searchType) {
          case 'region':
            return event.region === form.region;
          case 'zipCode':
            return event.zipCode === form.zipCode;
          case 'city':
            return event.city === form.city;
          default:
            return true;
        }
      });
    }
    // Recherche par sport
    if (form.sport) {
      updatedEvents = updatedEvents.filter(
        (event) => event.sport.name === form.sport,
      );
    }
    // Recherche par date de début
    if (form.startDateTime) {
      updatedEvents = updatedEvents.filter(
        (event) => new Date(event.startingTime) >= new Date(form.startDateTime),
      );
    }
    // Recherche par date de fin
    if (form.endDateTime) {
      updatedEvents = updatedEvents.filter(
        (event) => new Date(event.endingTime) <= new Date(form.endDateTime),
      );
    }

    setFilteredEvents(updatedEvents);
    setHasSearched(true);
  };

  // Réinitialisation de la recherche.
  const resetForm = () => {
    setForm({
      searchType: '',
      region: '',
      zipCode: '',
      city: '',
      sport: '',
      startDateTime: '',
      endDateTime: '',
    });
    setKeyword('');
    setFilteredEvents(eventList);
    setHasSearched(false);
  };

  // Gestion du scroll vers le résultat de recherche.

  // Création d'une reférence pour scroller vers les résultats de recherche.
  const searchResultRef = useRef<HTMLDivElement | null>(null);

  // useEffect gérant le déclenchement du scroll vers la recherche quand tous les éléments sont
  // rendus, afin d'éviter des imprécisions sur le point d'arrivée dues à un rendu en cours.
  useEffect(() => {
    if (hasSearched) {
      searchResultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredEvents, hasSearched]);

  // Rendu conditionnel selon qu'il y ait des événements trouvés ou non.
  const renderEventCards = () => {
    if (!hasSearched) {
      return null;
    }
    if (filteredEvents.length === 0) {
      return <div className="text-center text-xl font-bold mt-10">Aucun résultat trouvé</div>;
    }
    return <EventCards events={filteredEvents} />;
  };

  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>

      <section className="text-gray-800">
        <div className="mb-10">
          <div className="flex justify-center md:block mb-10">
            <button
              type="button"
              className="border text-sm bg-[#264b81] hover:bg-[#07252e] transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/recherche/utilisateurs')}
            >
              Aller sur recherche utilisateurs
            </button>
          </div>
          <div className="flex justify-center items-center gap-2 mb-7">
            <FaSearch size={22} />
            <h1 className="font-bold text-xl uppercase">Recherche d&#39;événements</h1>
          </div>
        </div>

        <div className="mb-12">
          <EventKeywordSearch
            eventList={eventList}
            setFilteredEvents={setFilteredEvents}
            setHasSearched={setHasSearched}
            keyword={keyword}
            setKeyword={setKeyword}
            searchResultRef={searchResultRef}
          />
        </div>

        <div className="bg-slate-200 py-6 px-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-5">Recherche par filtres</h2>
          <EventSearchForm
            eventList={eventList}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
          />
        </div>

        <div ref={searchResultRef} className="flex justify-center mb-12 pt-10">
          <button
            type="button"
            className="border text-sm bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            onClick={resetForm}
          >
            Reset des champs de recherche
          </button>
        </div>
        {renderEventCards()}

      </section>

    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste des événements.
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const eventsProps = await getEventsServerSideProps();

    // Pas besoin de trier ici car déjà trié par getAllEvents

    return {
      props: {
        eventList: eventsProps.eventList,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
