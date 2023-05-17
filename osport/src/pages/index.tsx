import Head from 'next/head';
import Description from '../components/Description';
import Cards from '../components/Cards';
import Sportssearch from '../components/SportSearch';

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
