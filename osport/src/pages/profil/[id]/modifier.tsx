import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un événement en fonction de son ID
export default function ProfileEdit() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Modification utilisateur {id} - osport</title>
      </Head>
      <h1>Modification utlisateur {id}</h1>
    </>

  );
}
