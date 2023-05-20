// Page d'affichage du prodil d'un utilisateur

import Head from 'next/head';
import { HiUserCircle } from 'react-icons/hi2';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { format, differenceInYears } from 'date-fns';
import { UserPublicData, EventListData } from '../../../types';
import {
  getUserById, getAllEventsFromOneUser, getAllEventsCreatedByOneUser,
} from '../../../services/userService';
import UserAgenda from '../../../components/UserAgenda';
import { useAuth } from '../../../contexts/AuthContext';

// Typage TypeScript des données renvoyées par les requêtes sous getServerSideProps.
interface ProfileProps {
  userData: UserPublicData;
  userEvents: EventListData;
  createdEvents: EventListData;
}

export default function Profile({
  userData, userEvents, createdEvents,
}: ProfileProps) {
  const { logout, userId: loggedUserId } = useAuth();
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
        {loggedUserId === userData.id && (
          <div className="mb-6">
            <Link href="/profil/:1/modifier">Modifier mon profil</Link>
            <button type="button" onClick={logout}>Déconnexion</button> {/* Bouton de déconnexion */}
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
      <div><Link href="/profil/:1/modifier">Modifié mon profil</Link></div>
      <UserAgenda events={userEvents} />
    </>
  );
}

// Fonction spéciale Next.js qui s'exécute coté serveur (SSR). Elle permet de récupérer les données
// de l'API avant de rendre la page.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id;

  // On redirige vers la page 404 si l'ID est d'un autre type que string
  if (typeof userId !== 'string') {
    return { notFound: true };
  }

  // On lance les requêtes API.
  const userResponse = await getUserById(userId);
  const userEventsResponse = await getAllEventsFromOneUser(userId);
  const createdEventsResponse = await getAllEventsCreatedByOneUser(userId);

  // Si l'ID n'est pas trouvé on redirige vers la page 404
  if (!userResponse.success) {
    return { notFound: true };
  }

  // On retourne des tableaux vides en cas d'echec des requêtes retournant des listes.
  return {
    props: {
      userData: userResponse.user,
      userEvents: userEventsResponse.success ? userEventsResponse.events : [],
      createdEvents: createdEventsResponse.success ? createdEventsResponse.createdEvents : [],
    },
  };
};
