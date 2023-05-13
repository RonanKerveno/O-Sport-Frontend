import Head from 'next/head';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Recherche - osport</title>
      </Head>
      <div>
        <div>
          <div className="flex flex-row space-x-20 border-2">
            <h1>Recherche une sortie</h1>
            <button className="border" type="submit">Reset</button>
          </div>
          <div><input type="text" placeholder="Mot-clé, Organisateur..." className="border" /></div>
          <div><select name="Tout les sports" id="" className="border">
            <option value="">--Choissisez un sport--</option>
            <option value="Football">Football</option>
            <option value="Rugby">Rugby</option>
            <option value="Handball">Hanndball</option>
            <option value="Tennis">Tennis</option>
            <option value="Danse">Danse</option>
               </select>
          </div>
        </div>
        <div>
          <select name="localisation" id="" className="border">
            <option value="Region">Region</option>
            <option value="Département">Département</option>
            <option value="Ville">Ville</option>
          </select>
        </div>
        <div>
          <select name="localisation_choise" id="" className="border">
            <option value="Choisissez votre région">Choisissez votre région</option>
          </select>
        </div>
        <div>Date et heure de début de l'activité
          <span><input type="datetime-local" className="border" /></span>
        </div>
        <div>Date et heure de fin de l'activité
          <span><input type="datetime-local" className="border" /></span>
        </div>
        <div>
          <button type="submit" className="border">Recherche</button>
        </div>
        <div><div className="border-t border-b">Rechercher un membre</div> <div><input type="text" name="search" id="" placeholder="nom d'utilisateur" /></div></div>
        <button type="submit">Chercher</button>
      </div>
      <Footer />
    </>

  );
}
