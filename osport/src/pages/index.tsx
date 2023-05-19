import Head from 'next/head';
import { useMediaQuery } from 'usehooks-ts';
import Footer from '@/components/Footer';
import Description from '../components/Description';
import Cards from '../components/Cards';
import SportSearch from '../components/SportSearch';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <Head>
        <title>Accueil - osport</title>
      </Head>
      <div className="w-full h-full flex flex-col flex-wrap bg-[#e0e1dd]">
        <Description />
        {isMobile ? (
          <div className="flex flex-col">
            <Cards />

            <SportSearch />
          </div>
        ) : (
          <>
            <div className="flex flex-row m-2">
              <Cards />

              <SportSearch />

            </div>
            <Footer />
          </>
        )}

      </div>
    </>
  );
}
