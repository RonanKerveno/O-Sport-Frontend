import { useState } from 'react';
import { EventData } from '@/types';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Description from '@/components/Description';
import EventSearchForm from '@/components/EventSearchForm';
import Cards from '@/components/Cards';
import EventKeywordSearch from '@/components/EventKeyWordSearch';
import router from 'next/router';

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

  const [filteredEvents, setFilteredEvents] = useState<EventData>(eventList);
  const [hasSearched, setHasSearched] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    let updatedEvents = [...eventList];

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
    if (form.sport) {
      updatedEvents = updatedEvents.filter(
        (event) => event.sport.name === form.sport,
      );
    }
    if (form.startDateTime) {
      updatedEvents = updatedEvents.filter(
        (event) => new Date(event.startingTime) >= new Date(form.startDateTime),
      );
    }
    if (form.endDateTime) {
      updatedEvents = updatedEvents.filter(
        (event) => new Date(event.endingTime) <= new Date(form.endDateTime),
      );
    }

    setFilteredEvents(updatedEvents);
    setHasSearched(true);
  };

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

  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <Description />
      <button
        type="button"
        className="ml-4 border text-xs bg-blue-700 hover:bg-blue-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/recherche/utilisateurs')}
      >
        Aller sur recherche utilisateurs
      </button>
      <h1 className="font-bold text-xl mx-4 my-5">Recherche d&#39;événements</h1>
      <div className="w-full h-full bg-white ml-2 rounded-md">
        <button
          type="button"
          className="ml-4 border text-sm bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 my-2 rounded"
          onClick={resetForm}
        >
          Reset
        </button>

        <div className="my-4">
          <EventKeywordSearch
            eventList={eventList}
            setFilteredEvents={setFilteredEvents}
            setHasSearched={setHasSearched}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        <div>
          <EventSearchForm
            eventList={eventList}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
          />
        </div>
        {hasSearched && <Cards events={filteredEvents} />}
      </div>

    </>
  );
}

// Traitement des requête API coté SSR pour récupérer la liste de événements.
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
