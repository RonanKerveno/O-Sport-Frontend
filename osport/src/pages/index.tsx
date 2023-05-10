import Head from 'next/head';
import Description from '../components/Description';
import Card from '../components/Card';
import SportSearch from '../components/SportSearch';

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <Description />
      <Card />
      <SportSearch />
    </>

  );
}
