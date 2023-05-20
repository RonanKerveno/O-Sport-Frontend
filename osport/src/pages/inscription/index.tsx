// Page d'inscription au site

import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import useLoggedRedirect from '../../hooks/useLoggedRedirect';

export default function Suscribe() {
  const { isLogged } = useAuth();

  useLoggedRedirect();

  // Si l'utilisateur est déjà inscrit on lui indique un message
  if (isLogged) {
    return <p>Vous êtes déjà connecté.</p>;
  }

  return (
    <>
      <Head>
        <title>Inscription - osport</title>
      </Head>
      <div className="flex flex-col space-">
        <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
          <h1> Inscription </h1>
        </div>
        {/* Champs d'inscription */}
        <div className="mt-5 mb-5">Nom<input className="ml-5 border" type="text" /></div>
        <div className="mt-5 mb-5">Prenom<input className="ml-5 border" type="text" /></div>
        <div className="mt-5 mb-5">Date de naissance<input className="ml-5 border" type="date" /></div>
        <div className="mt-5 mb-5">N°<span className="ml-40">Adresse</span> <br /><input className="border" type="number" /> <input className="border" type="text" /></div>
        <div className="mt-5 mb-5">Code Postale<input className="ml-5 border" type="number" /></div>
        <div className="mt-5 mb-5">Ville<input className="ml-5 border" type="texte" /></div>
        <div className="mt-5 mb-5">Email<input className="ml-5 border" type="mail" /></div>
        <div className="mt-5 mb-5 text-center"><button className="bg-[#b430a6] text-white font-bold py-2 px-4 rounded" type="submit">Inscription</button></div>
      </div>
    </>
  );
}
