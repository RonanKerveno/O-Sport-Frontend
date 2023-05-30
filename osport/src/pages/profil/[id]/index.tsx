// Page d'affichage du profil d'un utilisateur

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { UserPublicData, EventData } from '@/types';
import UserAgenda from '@/components/UserAgenda';
import { useAuth } from '@/contexts/AuthContext';
import getUserServerSideProps from '@/utils/userServerSideProps';
import UserCard from '@/components/UserCard';

// Typage TypeScript des données renvoyées par les requêtes sous getServerSideProps.
interface ProfileProps {
  userData: UserPublicData;
  userEvents: EventData;
  createdEvents: EventData;
}

export default function Profile({
  userData, userEvents, createdEvents,
}: ProfileProps) {
  const { logout, userId: loggedUserId, isAdmin } = useAuth();

  return (
    <>
      <Head>
        <title>Utilisateur - osport</title>
      </Head>
      <div className="flex flex-col min-h-screen items-center justify-center max-w-screen-md">
        <div className="flex-grow">
          <div className="mx-auto w-full">
            {(loggedUserId === userData.id || isAdmin) && (
              <div className="mb-6 text-center">
                <button
                  type="button"
                  onClick={() => router.push(`/profil/${userData.id}/modifier`)}
                  className={`font-bold py-2 px-4 rounded m-1 text-white ${isAdmin && loggedUserId !== userData.id ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
                  }`}
                >
                  {isAdmin && loggedUserId !== userData.id ? 'Modification admin' : 'Modifier mon profil'}
                </button>
                {loggedUserId === userData.id && (
                  <button
                    type="button"
                    onClick={logout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                  >
                    Déconnexion
                  </button>
                )}
              </div>
            )}
            <UserCard userData={userData} />
            <div className="flex items-center justify-center h-full">
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mb-4 ml-4 rounded-xl bg-white text-gray-700 shadow-md p-4">
                {userData.description}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto bg-clip-border rounded-xl bg-white text-gray-700 shadow-md  p-6  mb-5 text-center">
                <h3 className="font-bold">Sports favoris :</h3>
                <ul>
                  {userData.favoriteSports.map((sport) => (
                    <li key={sport.id}>{sport.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto bg-clip-border rounded-xl bg-white text-gray-700 shadow-md  p-6 pl-20 pr-20 mb-5 text-center">
              Participe à {userEvents.length} événements dont {createdEvents.length} créés
            </div>
          </div>
        </div>
        <UserAgenda events={userEvents} />
      </div>
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
