// /pages/profil/[id]/modifier.tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import UserProfileForm from '../../../components/UserProfileForm';
import { UserPublicData, UserPrivateData } from '../../../types';
import getPrivateServerSideProps from '../../../utils/userPrivateServerSide';

interface EditProfileProps {
  userData: UserPublicData;
}

export default function EditProfile({ userData }: EditProfileProps) {
  const router = useRouter();

  const handleUpdate = async (userPrivateData: UserPrivateData) => {
    console.log(userPrivateData);
    router.push(`/profil/${userData.id}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Modifier mon profil</h1>
      <UserProfileForm isEdit userData={userData} onSubmit={handleUpdate} />
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
