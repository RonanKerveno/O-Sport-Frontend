import Head from 'next/head';

export default function Suscribe() {
  return (
    <>
      <Head>
        <title>Inscription - osport</title>
      </Head>
      <div className="flex flex-col">
        <div className="text-[#b430a6] text-1xl font-sans font-bold text-center border">
          <h1> Inscription </h1>
        </div>
        <div>Nom<input type="text" /></div>
        <div>Prenom<input type="text" /></div>
        <div>Date de naissance<input type="date" /></div>
        <div>N°<input type="number" /> Adresse <input type="text" /></div>
        <div>Code Postale<input type="number" /></div>
        <div>Ville<input type="texte" /></div>
        <div>Email<input type="mail" /></div>
        <div className="mt-5 mb-5"><button className="bg-[#b430a6] text-white font-bold py-2 px-4 rounded" type="submit">Inscription</button></div>

      </div>
    </>

  );
}
