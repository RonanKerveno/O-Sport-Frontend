import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { UserPublicData, UserPrivateData } from '../../../types';
import { getUserByIdPrivate } from '../../../services/userService';
import getPrivateServerSideProps from '../../../utils/userPrivateServerSide';

interface EditProfileProps {
  userData: UserPublicData;
}

export default function EditProfile({ userData }: EditProfileProps) {
  const router = useRouter();
  const [username, setUsername] = useState(userData.userName);
  const [description, setDescription] = useState(userData.description);

  // These will be filled in once the component mounts and the private user data is fetched
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  useEffect(() => {
    const fetchPrivateData = async () => {
      const response = await getUserByIdPrivate(userData.id);
      if (response.success) {
        const userPrivateData: UserPrivateData = response.userPrivate;
        setEmail(userPrivateData.email);
        setFirstName(userPrivateData.firstName);
        setLastName(userPrivateData.lastName);
      } else {
        // handle error
      }
    };

    fetchPrivateData();
  }, [userData.id]);

  // This would be replaced with a real API call.
  const updateUserProfile = async () => {
    // Call the API to update the user profile.
    // After the update, redirect back to the profile page.
    router.push(`/profil/${userData.id}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Modifier mon profil</h1>
      <form onSubmit={updateUserProfile} className="max-w-sm">
        <div className="my-4">
          <label htmlFor="username" className="font-bold block">
            Nom d&#39;utilisateur
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded mt-1 font-normal"
            />
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="description" className="font-bold block">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded mt-1 resize-y font-normal"
            />
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="email" className="font-bold block">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded mt-1 font-normal"
            />
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="firstname" className="font-bold block">
            Prénom
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded mt-1 font-normal"
            />
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="lastname" className="font-bold block">
            Nom
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded mt-1 font-normal"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getPrivateServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
