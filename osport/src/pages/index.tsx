// Page Home

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import getEventsServerSideProps from '@/utils/eventsServerSideProps';
import { useMediaQuery } from 'usehooks-ts';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import Description from '@/components/Description';
import Cards from '@/components/Cards';
import SportSearch from '@/components/SportSearch';
import { EventData } from '@/types';

interface EventsDataProps {
  eventList: EventData;
}

export default function Home({ eventList }: EventsDataProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isLogged, showLoggedStatus, setShowLoggedStatus } = useAuth();

  // On affiche un message juste après la redirection depuis une page de connexion/déconnexion.
  useEffect(() => {
    if (showLoggedStatus) {
      const message = isLogged ? 'Vous êtes connecté' : 'Vous êtes déconnecté';
      toast(message);

      // Réinitialisation de l'état après l'affichage du message
      setShowLoggedStatus(false);
    }
  }, [isLogged, setShowLoggedStatus, showLoggedStatus]);

  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="flex flex-col flex-wrap bg-slate-100 w-full h-full justify-center items-center">
        <Description />
        {isMobile ? (
          <div className="">
            <Cards
              events={eventList}
            />
            <div>
              <SportSearch />
            </div>
          </div>
        ) : (
          <div className="flex flex-row m-2">
            <Cards
              events={eventList}
            />
            <SportSearch />
          </div>
        )}

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
