import { HiHome, HiUser } from 'react-icons/hi2'
import { HiSearch, HiPlus } from 'react-icons/hi'
import Head from 'next/head';
import Navbar from '../components/navbar'
import Title from '../components/title'
import Description from '../components/description'

export default function accueil() {
    return (
        <>
            <Head>
                <title>Accueil - osport</title>
            </Head>
            <Title />
            <Description />

            <Navbar />
        </>

    )
}