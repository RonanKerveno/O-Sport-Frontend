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
      <UserAgenda events={userEvents} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id;

  if (typeof userId !== 'string') {
    return { notFound: true };
  }

  const userResponse = await getUserById(userId);
  const userEventsResponse = await getAllEventsFromOneUser(userId);
  const createdEventsResponse = await getAllEventsCreatedByOneUser(userId);

  // Si non trouvé on renvoie vers la page 404
  if (!userResponse.success) {
    return { notFound: true };
  }

  return {
    props: {
      userData: userResponse.user,
      userEvents: userEventsResponse.success ? userEventsResponse.events : [],
      createdEvents: createdEventsResponse.success ? createdEventsResponse.createdEvents : [],
    },
  };
};
