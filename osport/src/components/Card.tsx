/* eslint-disable react/no-unescaped-entities */
// Composant d'affichage d'une carte événement
import { HiUser, HiUserGroup } from 'react-icons/hi2';
import { MdSportsBasketball } from 'react-icons/md';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

export default function Card() {
  const isMobile = useMediaQuery('(max-width: 320px)');
  return (

    <Link href="/evenement/:1">
      {isMobile ? (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="flex justify-end p-4"><div className="flex flex-col"><HiUserGroup size={30} /><div>5/23</div></div></div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"><MdSportsBasketball /></div>
          <div className="ml-5 mr-5">
            Titre de l'évènement
            <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
              <div>Strasbourg</div>
              <div className="font-bold">20/05/2022 10h00</div>
            </div>
            <div className="mt-4 mb-2 flex flex-row justify-center">
              <div className="flex justify-center mb-4"><HiUser size={30} color="black" /></div>
              <div className="ml-2 flex justify-center">François</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transform motion-safe:hover:scale-110 duration-300">
          <div className="flex justify-end p-4"><div className="flex flex-col"><HiUserGroup size={30} /><div>5/23</div></div></div>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"><MdSportsBasketball /></div>
          <div className="ml-5 mr-5">
            Titre de l'évènement
            <div className="border-t-2 border-b-2 border-gray-2000 mt-4">
              <div>Strasbourg</div>
              <div className="font-bold">20/05/2022 10h00</div>
            </div>
            <div className="mt-4 mb-2 flex flex-row justify-center">
              <div className="flex justify-center mb-4"><HiUser size={30} color="black" /></div>
              <div className="ml-2 flex justify-center">François</div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
