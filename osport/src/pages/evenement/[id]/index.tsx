import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un événement en fonction de son ID
export default function Event() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Evénement {id} - osport</title>
      </Head>
      <h1>Evénement {id}</h1>
    </>

  );
}
