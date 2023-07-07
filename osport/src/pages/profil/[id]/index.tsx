// Page d'affichage du profil d'un utilisateur

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { UserPublicData, EventData } from '@/types';
import UserAgenda from '@/components/UserAgenda';
import { useAuth } from '@/contexts/AuthContext';
import getUserServerSideProps from '@/utils/userServerSideProps';
import UserCard from '@/components/UserCard';
import { toast, ToastContainer } from 'react-toastify';
import { useToast } from '@/contexts/ToastContext';
import { useEffect } from 'react';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';
import { HiDocumentText, HiHeart } from 'react-icons/hi';
import { ImStatsDots } from 'react-icons/im';

// Typage des données renvoyées par les requêtes SSR.
interface ProfileProps {
  userData: UserPublicData;
  userEvents: EventData;
  createdEvents: EventData;
}

export default function Profile({
  userData, userEvents, createdEvents,
}: ProfileProps) {
  // Récupération du statut de l'utilisateur connecté et recupération de la fonction de déconnexion
  // via le Context d'authentification.
  const { logout, userId: loggedUserId, isAdmin } = useAuth();

  // Gestion du Toaster

  // Context gérant les paramètres du toaster.
  const { setToastMessage, toastMessage, toastDuration } = useToast();
  // useEffect gérant les actions d'affichage des messages toaster.
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
      // Réinitialisation du message après l'affichage du toast
      setToastMessage('');
    }
  }, [toastMessage, setToastMessage]);

  return (
    <>
      <Head>
        <title>Profil {userData.userName} - osport</title>
      </Head>
      <section>
        <div className="">
          {(loggedUserId === userData.id || isAdmin) && (
            <div className="mb-10 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => router.push(`/profil/${userData.id}/modifier`)}
                className={`font-bold py-2 px-4 rounded text-white transition-colors duration-1000 ${isAdmin && loggedUserId !== userData.id ? 'bg-red-500 hover:bg-red-700' : 'bg-[#264b81] hover:bg-slate-600'}`}
              >
                {isAdmin && loggedUserId !== userData.id ? 'Modification admin' : 'Modifier mon profil'}
              </button>
              {loggedUserId === userData.id && (
                <button type="button" onClick={logout} className="bg-orange-700 hover:bg-orange-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded">
                  Déconnexion
                </button>
              )}
            </div>
          )}

          <div className="mb-3">
            <UserCard userData={userData} />
          </div>

          <div className="mb-3 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
            <div className="mb-4 flex items-center gap-2 font-bold text-xl">
              <HiDocumentText size={22} />
              <h2>Présentation</h2>
            </div>
            <p>{userData.description}</p>
          </div>

          <div className=" mb-3 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
            <div className="mb-4 flex items-center gap-2 font-bold text-xl">
              <HiHeart size={22} />
              <h2>Sports favoris</h2>
            </div>
            <ul className="md:flex md:flex-wrap gap-7">
              {userData.favoriteSports.map((sport) => {
                const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
                return (
                  <li key={sport.id} className="flex items-center gap-2 mb-1">
                    <SportIcon size={22} />
                    {sport.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-12 px-4 py-6 bg-slate-200 text-gray-700 rounded-md shadow-md">
            <div className="mb-4 flex items-center gap-2 font-bold text-xl">
              <ImStatsDots size={18} />
              <h2>Statistiques événéments</h2>
            </div>
            <div className="md:flex md:flex-wrap gap-7">
              <p>Evénéments créés : <span className="font-bold">{createdEvents.length}</span></p>
              <p>Participation (créés compris) : <span className="font-bold">{userEvents.length}</span></p>
            </div>
          </div>

        </div>

        <UserAgenda events={userEvents} />

        <ToastContainer autoClose={toastDuration} />
      </section>
    </>
  );
}

// Appel vers la fonction spéciale ServerSideProps Next.js qui s'exécute coté serveur (SSR).
// Elle permet de récupérer les données de l'API avant de rendre la page.
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getUserServerSideProps(context);
    return { props };
    // Si ID mal typé ou introuvable on renvoit vers la page 404.
  } catch (error) {
    return { notFound: true };
  }
};
