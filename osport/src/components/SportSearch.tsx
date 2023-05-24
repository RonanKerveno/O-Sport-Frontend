import { useMediaQuery } from 'usehooks-ts';
import {
  MdSportsBasketball,
  MdSportsFootball, MdSportsGolf, MdSportsHandball, MdSportsRugby,
  MdSportsGymnastics, MdSportsSoccer,
} from 'react-icons/md';
import Link from 'next/link';

export default function SportSearch() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div>{isMobile ? (

      <div className="overflow-auto flex flex-row justify-center border-t-2 border-b-2 border-{#0a248f} space-x-4 mt-6 pb-4 pt-4 mb-0 ">
        <Link href="/"><MdSportsBasketball size={50} color="#black" /></Link>
        <Link href="/"><MdSportsFootball size={50} color="#black" /></Link>
        <Link href="/"><MdSportsGolf size={50} color="#black" /></Link>
        <Link href="/"><MdSportsHandball size={50} color="#black" /></Link>
        <Link href="/"><MdSportsRugby size={50} color="#black" /></Link>
        <Link href="/"><MdSportsGymnastics size={50} color="#black" /></Link>

      </div>

    ) : (

      <div className="overflow-auto flex flex-col justify-center border-b-2 border-{#0a248f} space-y-4 mt-6 p-4 mb-0 ml-4 bg-white rounded-md shadow-md">
        <Link href="/"><MdSportsBasketball size={50} color="black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsFootball size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsGolf size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsHandball size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsRugby size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsGymnastics size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsSoccer size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>
        <Link href="/"><MdSportsGymnastics size={50} color="#black" className="transform motion-safe:hover:scale-110 duration-300" /></Link>

      </div>

    )}
    </div>
  );
}
