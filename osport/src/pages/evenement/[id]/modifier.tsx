// Page de modification d'un événement.

/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import { HiUserCircle, HiUserGroup } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';

// Visualisation d'un événement en fonction de son ID
export default function EventEdit() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Modification evénement</title>
      </Head>
      <h1>Modification evénement {id}</h1>
      <div className="border-2 text-[#b430a6] text-center"><h1>Evénement {id}</h1></div>
      <div className="border-2">
        <div className="flex flex-row space-x-80">
          <span className="flex flex-col">5/15 <HiUserGroup /></span>
          <span><MdSportsHandball size={30} /></span>
        </div>
        <div className="text-center">Titre événement : <input type="text" /></div>
        <div className="border-2">
          <div>Ville :<input type="text" /></div>
          <div>Adresse :<input type="text" /></div>
          <div>Date de rendez-vous : <input type="date" /></div>
          <div>Heure de rendez-vous :<input type="time" /></div>
          <div>Sport : <input type="text" /></div>

        </div>
        <div className="border-2">Description de l'événement :<br />
          <input type="text" />
        </div>

        <div className="ml-2 flex flex-row space-x-4">
          <span>Participant a l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
        <div className="ml-2 flex flex-row space-x-4">
          <span>Créateur de l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
        <div className="border text-center"><button type="submit">Enregistrer</button></div>
      </div>
      <Footer />
    </>

  );
}
