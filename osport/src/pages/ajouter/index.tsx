/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { HiUserGroup, HiUserCircle } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';

export default function Ajouter() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="text-[#b430a6] text-center">
        <h1>Evénement {id}</h1>
      </div>
      <div className="border-2 w-full p-4">
        <div className="flex flex-row space-x-4">
          <span className="flex flex-col items-center">
            <input type="number" max={35} min={1} name="numberofuser" className="border-2" />
            <HiUserGroup />
          </span>
          <span>
            <MdSportsHandball size={30} />
          </span>
        </div>
        <div className="text-center">
          Titre événement: <input type="text" />
        </div>
        <div className="border-2 p-2">
          <div>Ville :<input type="text" /></div>
          <div>Adresse :<input type="text" /></div>
          <div>Date de rendez-vous: <input type="date" /></div>
          <div>Heure de rendez-vous :<input type="time" /></div>
          <div>Sport: <input type="text" /></div>
        </div>
        <div className="border-2 p-2">
          Description de l'événement :<br />
          <input type="text" />
        </div>
        <div className="ml-2 flex flex-row space-x-4">
          <span>Participant à l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
        <div className="ml-2 flex flex-row space-x-4">
          <span>Créateur de l'évènement :</span>
          <span className="flex flex-col">Jude <HiUserCircle size={20} /></span>
        </div>
        <div className="border text-center mt-4">
          <button type="submit">Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
