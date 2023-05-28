// Page d'affichage du profil d'un utilisateur

import Head from 'next/head';
import { HiUserCircle } from 'react-icons/hi2';
import { GetServerSideProps } from 'next';
import { format, differenceInYears } from 'date-fns';
import router from 'next/router';
import { UserPublicData, EventData } from '@/types';
import UserAgenda from '@/components/UserAgenda';
import { useAuth } from '@/contexts/AuthContext';
import getUserServerSideProps from '@/utils/userServerSideProps';

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
  // Calcul de l'âge
  const age = differenceInYears(new Date(), new Date(userData.dateOfBirth));
  // Détermination la lettre du genre (F/H)
  const genderSymbol = userData.gender === 'féminin' ? 'F' : 'H';
  // Détermination de l'écriture genrée de admin
  const admin = userData.gender === 'féminin' ? 'Administratrice' : 'Administrateur';
  // Formatage de la date d'inscription
  const registrationDate = format(new Date(userData.createdAt), 'dd/MM/yyyy');

  return (
    <>
      <Head>
        <title>Utilisateur - osport</title>
      </Head>
      <div className="overflow-auto">
        {(loggedUserId === userData.id || isAdmin) && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => router.push(`/profil/${userData.id}/modifier`)}
              className={`font-bold py-2 px-4 rounded m-1 text-white ${isAdmin && loggedUserId !== userData.id ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              {isAdmin && loggedUserId !== userData.id ? 'Modification admin' : 'Modifier mon profil'}
            </button>
            {loggedUserId === userData.id && (
              <button type="button" onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
                Déconnexion
              </button>
            )}
          </div>
        )}
        <div className="flex flex-row mb-4">
          <span>
            <HiUserCircle size={100} />
          </span>
          <span>
            <div>
              <h2 className="text-lg font-bold">{`${userData.userName}${userData.isAdmin ? ` (${admin})` : ''}`}</h2>
            </div>
            <div>{`${age}/${genderSymbol} - ${userData.city}`}</div>
            <div>Date d&#39;inscription</div>
            <div>{registrationDate}</div>
          </span>
        </div>
        <div className="mb-4">{userData.description}</div>
        <div className="mb-4">
          <h3 className="font-bold">Sports favoris :</h3>
          <ul>
            {userData.favoriteSports.map((sport) => (
              <li key={sport.id}>{sport.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-3">Participe à {userEvents.length} evenements dont {createdEvents.length} créés</div>
      </div>
      <UserAgenda events={userEvents} />
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
