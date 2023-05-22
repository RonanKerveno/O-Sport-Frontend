// Composant d'affichage d'une carte événement

import { HiUser, HiStar, HiUserGroup } from 'react-icons/hi2';
import { MdSportsBasketball } from 'react-icons/md';
import Link from 'next/link';

export default function Card() {
  return (
    <Link href="/evenement/:1">
      <div className="border-2 w-40 h-72 border-black rounded-md text-center grid justify-items-center mb-6 bg-white">
        <div className="flex justify-start"><HiUserGroup />5/23</div>
        <div><MdSportsBasketball /></div>
        <div className="#">
          Nisl tincidunt eget nullam non nisi
          <div className="border-t-2 border-b-2 border-[#0a248f] mt-4">
            <div>Strasbourg</div>
            <div className="font-bold">20/05/2022 10h00</div>
          </div>
          <div className="mt-4 mb-2">
            <div className="flex justify-center mb-4"><HiUser size={24} color="#b430a6" /></div>
            <div>François</div>
          </div>
          <div className="flex flex-row justify-center"><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /></div>
        </div>
      </div>
    </Link>
  );
}
