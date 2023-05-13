import Head from 'next/head';
import Navbar from '../components/navbar';
import Description from '../components/description';
import Card from '../components/card';
import Sportssearch from '../components/sportssearch';
import Footer from '../components/footer';

export default function Home() {
  const cardIds = [1, 2, 3, 4, 5]; // Liste des IDs des cards à afficher

  return (
    <div className="flex flex-col content-center">
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <Description />
      <div className="flex justify-center space-x-4 ">
        {cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </div>
      <Sportssearch />
      <Footer />
    </div>
  );
}
