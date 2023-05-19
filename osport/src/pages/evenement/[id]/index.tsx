/* eslint-disable react/no-unescaped-entities */
import { HiUserCircle, HiUserGroup } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un événement en fonction de son ID
export default function Event() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Evénement {id} - osport</title>
      </Head>
      <div className="border-2 text-[#b430a6] text-center"><h1>Evénement {id}</h1></div>
      <div className="border-2">
        <div className="flex flex-row space-x-80">
          <span className="flex flex-col">5/15 <HiUserGroup /></span>
          <span><MdSportsHandball size={30} /></span>
        </div>
        <div className="text-center">Titre événement</div>
        <div className="text-center"><button className="border-2 bg" type="submit">S'inscrire</button></div>
        <div className="border-2">
          <div>Ville</div>
          <div>Adresse</div>
          <div>Date de rendez-vous</div>
          <div>Heure de rendez-vous</div>
          <div>Sport</div>

        </div>
        <div className="border-2">Description de l'événement : <br />
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing
        </div>

        <div className="ml-2 flex flex-row space-x-4">
          <span>Participant a l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
        <div className="ml-2 flex flex-row space-x-4">
          <span>Créateur de l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
      </div>
    </>

  );
}
