import { GetServerSidePropsContext } from 'next';
import { getLoggedInUser } from '../services/userService';

// Fonction de vérification côté serveur (SSR)
const verifyUserServerSideProps = async (context: GetServerSidePropsContext) => {
  // Extraire l'ID de l'utilisateur depuis l'URL
  const { params } = context;
  const userID = params?.id as string;

  // Vérifier si l'utilisateur est connecté et a le droit de modifier le profil
  const userStatus = await getLoggedInUser();
  const { success: isLogged, isAdmin, userId } = userStatus;

  if (!isLogged || (!isAdmin && userId !== userID)) {
    return {
      redirect: {
        destination: `/profil/${userID}`,
        permanent: false,
      },
    };
  }

  return null;
};

export default verifyUserServerSideProps;
