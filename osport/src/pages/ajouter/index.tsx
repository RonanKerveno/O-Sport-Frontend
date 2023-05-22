/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { HiUserGroup, HiUserCircle } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';

export default function AddEvent() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="w-max h-full flex flex-col justify-center items-center bg-[#e0e1dd]">
      <div className="bg-white border border-gray-400 rounded-md">
        <div className="text-[#b430a6] text-center">
          <h1>Evénement {id}</h1>
        </div>
        <div className="border-2 p-4 border-gray-400 rounded-md m-2">
          <div className="flex flex-row justify-between">
            <span className="flex flex-row space-x-2 items-center">
              <input type="number" max={35} min={1} name="numberofuser" className="border-2 border-gray-400 rounded-md" />
              <HiUserGroup size={30} />
            </span>
            <span>
              <MdSportsHandball size={30} />
            </span>
          </div>
          <div className="w-full">
            <div className="text-center">
              Titre événement: <br /><input type="text" className="border border-gray-500 rounded-md " />
            </div>
          </div>
          <div className="border-2 p-4 border-gray-600 rounded-md m-2 space-y-4">
            <div>Ville :<input type="text" className="border-b ml-2 border-black" /></div>
            <div>Adresse :<input type="text" className="border-b ml-2 border-black" /></div>
            <div>Date de rendez-vous: <input type="date" className="border ml-2 border-black rounded-md p-1" /></div>
            <div>Heure de rendez-vous :<input type="time" className="border ml-2 border-black rounded-md p-1" /></div>
            <div>Sport: <input type="text" className="border-b ml-2 border-black" /></div>
          </div>
          <div className="border-2 p-2 border-gray-600 rounded-md">
            Description de l'événement :<br />
            <input type="text" />
          </div>
          <div className="flex flex-row space-x-4 border-b m-2 p-2">
            <span>Participant à l'évènement :</span>
            <span className="flex flex-col">Jude <HiUserCircle size={30} /></span>
          </div>
          <div className="flex flex-row space-x-4 m-2 p-2">
            <span>Créateur de l'évènement :</span>
            <span className="flex flex-col">Jude <HiUserCircle size={30} /></span>
          </div>
          <div className="border text-center mt-4 border-black rounded-md hover:bg-blue-600 hover:text-[#f9fafb]">
            <button type="submit">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
