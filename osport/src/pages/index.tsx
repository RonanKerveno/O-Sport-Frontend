/* eslint-disable import/no-unresolved */
import Head from 'next/head';
import { useMediaQuery } from 'usehooks-ts';
import Description from '@/components/Description';
import Footer from '@/components/Footer';
import Cards from '../components/Cards';
import SportSearch from '../components/SportSearch';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="flex flex-col flex-wrap bg-slate-100 w-full h-full justify-center items-center">
        <Description />
        {isMobile ? (
          <div className="">
            <Cards />
            <div>
              <SportSearch />
            </div>
            <Footer />
          </div>
        ) : (
          <div className="flex flex-row m-2">
            <Cards />
            <SportSearch />
          </div>
        )}

      </div>
    </>
  );
}
