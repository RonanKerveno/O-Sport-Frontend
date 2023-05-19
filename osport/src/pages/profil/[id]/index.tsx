/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { HiUserCircle } from 'react-icons/hi2';
import Link from 'next/link';
import Footer from '../../../components/footer';

interface UserData {
  username: string;
  age: number;
  location: string;
  registrationDate: string;
  description: string;
  favoriteActivities: string[];
  upcomingEvents: number;
  organizedEvents: number;
  participatedEvents: number;
  participatedOrganizedEvents: number;
  showFinishedEvents: boolean;
  showOrganizedEvents: boolean;
}

// Visualisation d'un profil en fonction de son ID
export default function Profile() {
  const userData: UserData = {
    username: 'Surya-on-ice',
    age: 32,
    location: 'Strasbourg',
    registrationDate: '22/12/2021',
    description:
      'Ea exercitationem illum vel ratione totam aut magnam cumque sed fuga praesentium ad corrupti quos in sint fuga qui eius consectetur.',
    favoriteActivities: ['Patinage sur glace', 'Natation', 'Curling'],
    upcomingEvents: 4,
    organizedEvents: 1,
    participatedEvents: 18,
    participatedOrganizedEvents: 8,
    showFinishedEvents: false,
    showOrganizedEvents: false,
  };

  return (
    <>
      <Head>
        <title>Utilisateur - osport</title>
      </Head>
      <div className="overflow-auto">
        <div className="flex flex-row">
          <span>
            <HiUserCircle size={100} />
          </span>
          <span>
            <div>
              <h2>{userData.username}</h2>
            </div>
            <div>{`${userData.age}/F - ${userData.location}`}</div>
            <div>Date d'inscription</div>
            <div>{userData.registrationDate}</div>
          </span>
        </div>
        {/* etc.. */}
      </div>
      <div><Link href="/profil/:1/modifier">Modifié mon profil</Link></div>
    </>
  );
}
