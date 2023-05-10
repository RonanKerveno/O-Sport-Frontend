import Head from 'next/head';
import Navbar from '../components/Navbar';
import Description from '../components/Description';
import Card from '../components/Card';
import SportSearch from '../components/SportSearch';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <Description />
      <Card />
      <SportSearch />
      <Navbar />
      <Footer />

    </>

  );
}
