import { HiHome, HiUser } from 'react-icons/hi2'
import { HiSearch, HiPlus } from 'react-icons/hi'
import Head from 'next/head';
import Navbar from '../components/navbar';
import Title from '../components/title';
import Description from '../components/description';
import Card from '../components/card';
import Cards from '../components/cards';
import Sportssearch from '../components/sportssearch';
import Footer from '../components/footer';

export default function accueil() {
    return (
        <>
            <Head>
                <title>Accueil - osport</title>
            </Head>
            <div className='flex justify-center items-center flex-col'>
            
            <div> <Title />
            <Description /></div>
            <Card />
            <Sportssearch />
            <Navbar />
            <Footer />
            </div>
        </>

    )
}