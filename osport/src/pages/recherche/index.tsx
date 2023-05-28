import { useState } from 'react';
import { EventData } from '@/types';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Description from '@/components/Description';
import EventSearchForm from '@/components/EventSearchForm';
import Cards from '@/components/Cards';
import KeywordSearch from '@/components/EventKeyWordSearch';

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

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    let updatedEvents = [...eventList];

    if (form.searchType) {
      updatedEvents = updatedEvents.filter((event) => {
        switch (form.searchType) {
          case 'region':
            return event.region === form.region;
          case 'zipCode':
            return event.zipCode.toString() === form.zipCode;
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

  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <Description />
      <div className="w-full h-full bg-white ml-2 rounded-md">
        <div className="mb-4">
          <KeywordSearch
            eventList={eventList}
            setFilteredEvents={setFilteredEvents}
            setHasSearched={setHasSearched}
          />
        </div>
        <div>
          <EventSearchForm
            eventList={eventList}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            setFilteredEvents={setFilteredEvents}
            setHasSearched={setHasSearched}
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
    const props = await getEventsServerSideProps();
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
