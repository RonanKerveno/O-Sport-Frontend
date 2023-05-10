import { HiHome, HiUser } from 'react-icons/hi2'
import { HiSearch, HiPlus } from 'react-icons/hi'
import Head from 'next/head';
import DefaultLayout from '../layouts/Default'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Description from '../components/Description'

export default function Home() {
    return (
        //     <Head>
        //     <title>Accueil - osport</title>
        // </Head>
        <DefaultLayout>
            <Description />
        </DefaultLayout>

    )
}