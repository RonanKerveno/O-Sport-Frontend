import { useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
import Description from '../components/Description';
import Cards from '../components/Cards';
import SportSearch from '../components/SportSearch';

export default function Home() {
  const { isLogged, showLoggedStatus, setShowLoggedStatus } = useAuth();

  useEffect(() => {
    if (showLoggedStatus) {
      const message = isLogged ? 'Vous êtes connecté' : 'Vous êtes déconnecté';
      toast(message);

      // Réinitialisez l'état après l'affichage du message
      setShowLoggedStatus(false);
    }
  }, [isLogged, setShowLoggedStatus, showLoggedStatus]);

  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="flex flex-col flex-wrap">
        <Description />

        <Cards />

        <SportSearch />
      </div>
    </>
  );
}
