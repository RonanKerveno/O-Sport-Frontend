import Head from 'next/head';
import Navbar from '../components/Navbar';
import Description from '../components/Description';
import Card from '../components/Card';
import Sportssearch from '../components/sportssearch';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
           <Head>
        <title>Accueil - osport</title>
          </Head>
          <Description />
            <Card />
            <Sportssearch />
            <Navbar />
            <Footer />
            
        </>

    );
}