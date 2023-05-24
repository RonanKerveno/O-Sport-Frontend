// /pages/profil/[id]/modifier.tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import getProfileServerSideProps from '@/utils/profileServerSideProps';
import { modifyOneUser } from '@/services/userService';
import UserProfileForm from '@/components/UserProfileForm';
import { UserPublicData, UserPrivateData, SportsListData } from '@/types';

type FullUserData = UserPublicData & UserPrivateData;

interface EditProfileProps {
  userData: UserPublicData;
  sportsList: SportsListData;
}

export default function EditProfile({ userData, sportsList }: EditProfileProps) {
  const router = useRouter();

  const handleUpdate = async (fullUserData: FullUserData) => {
    console.log(fullUserData);
    try {
      // Appel à la fonction modifyOneUser pour mettre à jour les données utilisateur
      const response = await modifyOneUser(fullUserData);

      if (response.success) {
        // Redirection vers la page du profil de l'utilisateur
        router.push(`/profil/${userData.id}`);
      } else {
        // Gestion des erreurs lors de la mise à jour
        console.log('Une erreur est survenue lors de la mise à jour du profil.');
      }
    } catch (error) {
      console.log('Une erreur est survenue lors de la mise à jour du profil :', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Modifier mon profil</h1>
      <UserProfileForm isEdit userData={userData} sportsList={sportsList} onSubmit={handleUpdate} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const props = await getProfileServerSideProps(context);
    return { props };
  } catch (error) {
    return { notFound: true };
  }
};
