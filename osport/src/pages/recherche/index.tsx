/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Searchfiltre from '@/components/Searchfiltre';

export default function Home() {
  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <div className="bg-slate-100 w-100 h-full">
        <Searchfiltre />
      </div>
    </>

  );
}
