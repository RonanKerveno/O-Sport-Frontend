import Head from 'next/head';
import { useState } from 'react';
import { HiUserCircle } from 'react-icons/hi2';
import Card from '@/components/card';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: 'Surya-on-ice',
    age: 32,
    location: 'Strasbourg',
    registrationDate: '22/12/2021',
    description:
      "Ea exercitationem illum vel ratione totam aut magnam cumque sed fuga praesentium ad corrupti quos in sint fuga qui eius consectetur.",
    favoriteActivities: ['Patinage sur glace', 'Natation', 'Curling'],
    upcomingEvents: 4,
    organizedEvents: 1,
    participatedEvents: 18,
    participatedOrganizedEvents: 8,
    showFinishedEvents: false,
    showOrganizedEvents: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === 'checkbox' ? checked : value;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Données enregistrées:', userData);
  };

  const handleModifierClick = () => {
    setIsEditMode(true);
  };

  return (
    <>
      <Head>
        <title>Utilisateur - osport</title>
      </Head>
      <div className="overflow-auto">
        <div>
          {!isEditMode ? (
            <button onClick={handleModifierClick}>
              Modifier mon profil/compte
            </button>
          ) : (
            <button disabled>
             Enregistrer
            </button>
          )}
        </div>
        <div className="flex flex-row">
          <span>
            <HiUserCircle size={100} />
          </span>
          <span>
            <div>
              {!isEditMode ? (
                <h2>{userData.username}</h2>
              ) : (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              )}
            </div>
            <div>
              {!isEditMode ? (
                `${userData.age}/F - ${userData.location}`
              ) : (
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                />
              )}
            </div>
            <div>Date d'inscription</div>
            <div>{userData.registrationDate}</div>
          </span>
        </div>
        {/* Le reste du contenu */}
      </div>
    </>
  );
}
