import Head from 'next/head';
import Description from '../components/description';
import Cards from '../components/Cards';
import Sportssearch from '../components/sportssearch';

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="flex flex-col flex-wrap">
        <Description />

        <Cards />

        <Sportssearch />
      </div>
    </>
  );
}
