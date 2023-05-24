// Composant d'affichage d'une carte événement

import { HiUser, HiStar, HiUserGroup } from 'react-icons/hi2';
import { MdSportsBasketball } from 'react-icons/md';
import Link from 'next/link';

export default function Card() {
  return (
    <Link href="/evenement/:1">
      <div className="border-2 w-40 h-72 border-black rounded-md text-center grid justify-items-center mb-6 bg-white">
        <div className="flex justify-start">
          <HiUserGroup className="text-2xl mr-2" /><span>5/23</span>
        </div>
        <div><MdSportsBasketball className="text-2xl" /></div>
        <div className="#">
          Nisl tincidunt eget nullam non nisi
          <div className="border-t-2 border-b-2 border-[#f2f2f2] mt-4">
            <div>Strasbourg</div>
            <div className="font-bold">20/05/2022 10h00</div>
          </div>
          <div className="mt-4 mb-2">
            <div className="flex justify-center "><HiUser size={24} color="#55555580" /></div>
            <div>François</div>
          </div>
          <div className="flex flex-row justify-center"><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /><HiStar color="#e9c46a" /></div>
        </div>
      </div>
    </Link>
  );
}
