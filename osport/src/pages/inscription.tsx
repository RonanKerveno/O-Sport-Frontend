import Head from 'next/head';
import Navbar from '../components/navbar';
import Title from '../components/title';
import Description from '../components/description';
import Card from '../components/card';
import Cards from '../components/cards';
import Sportssearch from '../components/sportssearch';
import Footer from '../components/footer';


export default function inscription(){
    return(
        <div className='flex flex-col'>
            <div> <Title /></div>
            <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
            <h1> Inscription </h1>
            </div>
            <div>Nom<input type="text" /></div>
            <div>Prenom<input type="text" /></div>
            <div>Date de naissance<input type="date" /></div>
            <div>N°<input type="number" /> Adresse <input type="text" /></div>
            <div>Code Postale<input type="number" /></div>
            <div>Ville<input type="texte" /></div>
            <div>Email<input type="mail"/></div>
            <div className='mt-5 mb-5'><button className='bg-[#b430a6] text-white font-bold py-2 px-4 rounded'>Inscription</button></div>
            <Footer />
            <Navbar />
        </div>
    )
}