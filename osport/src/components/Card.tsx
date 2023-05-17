import { HiUser, HiStar, HiUserGroup } from 'react-icons/hi2';
import { MdSportsBasketball } from 'react-icons/md';

export default function Card() {
  return (
    <div className="border-2 w-40 h-64 border-[#0a248f] text-center grid justify-items-center mt-6 mb-6">
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
        <div className="flex flex-row justify-center"><HiStar color="#b430a6" /><HiStar color="#b430a6" /><HiStar color="#b430a6" /><HiStar color="#b430a6" /><HiStar color="#b430a6" /></div>
      </div>
    </div>
  );
}
