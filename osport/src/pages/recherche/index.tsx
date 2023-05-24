/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';

export default function SearchEvent() {
  return (
    <div className="w-full h-full">
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <div className=" w-full h-full bg-white m-2 rounded-md">
        <div>
          <div className="flex flex-row space-x-20 border-2 border-2 p-4">
            <h1 className="p-4">Recherche une sortie</h1>
            <button className="border bg-black hover:bg-gray-500 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1" type="submit">Reset</button>
          </div>
          <div><input type="text" placeholder="Mot-clé, Organisateur..." className="border mt-2 mb-1" /></div>
          <div>
            <select name="Tout les sports" id="" className="border mb-1">
              <option value="">Choissisez un sport</option>
              <option value="Football">Football</option>
              <option value="Rugby">Rugby</option>
              <option value="Handball">Handball</option>
              <option value="Tennis">Tennis</option>
              <option value="Danse">Danse</option>
              <option value="Esports">Esports</option>
              <option value="Esports">Basketball</option>
              <option value="Esports">Golf</option>
              <option value="Esports">Vélo</option>
              <option value="Esports">Randonnée</option>
            </select>
          </div>
        </div>
        <div>
          <select name="localisation" id="" className="border mb-1">
            <option value="Region">Region</option>
            <option value="Département">Département</option>
            <option value="Ville">Ville</option>
          </select>
        </div>
        <div>
          <select name="localisation_choise" id="" className="border mb-1">
            <option value="Choisissez votre région">Choisissez votre région</option>
          </select>
        </div>
        <div>Date et heure de début de l'activité
          <span><input type="datetime-local" className="border mb-1" /></span>
        </div>
        <div>Date et heure de fin de l'activité
          <span><input type="datetime-local" className="border mb-1" /></span>
        </div>
        <div>
          <button type="submit" className="border bg-blue-500 hover:bg-blue-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded mb-9">Recherche</button>
        </div>
        <div><div className="border-t border-b text-center p-4 mb-1">Rechercher un membre</div> <div className="flex flex-row"><div><input type="text" name="search" id="" placeholder=" nom d'utilisateur" className="border border-black rounded-md m-1 mt-3" /></div><button type="submit" className="bg-blue-500 hover:bg-blue-700 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded m-1">Chercher</button></div></div>
      </div>
    </div>

  );
}
