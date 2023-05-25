import Head from 'next/head';
import { useMediaQuery } from 'usehooks-ts';
import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import Description from '../components/Description';
import Cards from '../components/Cards';
import SportSearch from '../components/SportSearch';

export default function Home() {
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
            <Cards />
            <div>
              <SportSearch />
            </div>
            <Footer />
          </div>
        ) : (
          <div className="flex flex-row m-2">
            <Cards />
            <SportSearch />
          </div>
        )}

      </div>
    </>
  );
}
