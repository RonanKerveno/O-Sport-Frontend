import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un profil en fonction de son ID
export default function Profile() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Utilisateur {id} - osport</title>
      </Head>
      <h1>Utilisateur {id}</h1>
    </>

  );
}
