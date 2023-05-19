import {
  MdSportsBasketball,
  MdSportsFootball, MdSportsGolf, MdSportsHandball, MdSportsRugby, MdSportsGymnastics,
} from 'react-icons/md';
import Link from 'next/link';

export default function SportSearch() {
  return (
    <div className="overflow-auto flex flex-row justify-center border-t-2 border-b-2 border-{#0a248f} space-x-4 mt-6 pb-4 pt-4 mb-0 ">
      <Link href="/"><MdSportsBasketball size={50} color="#b430a6" /></Link>
      <Link href="/"><MdSportsFootball size={50} color="#b430a6" /></Link>
      <Link href="/"><MdSportsGolf size={50} color="#b430a6" /></Link>
      <Link href="/"><MdSportsHandball size={50} color="#b430a6" /></Link>
      <Link href="/"><MdSportsRugby size={50} color="#b430a6" /></Link>
      <Link href="/"><MdSportsGymnastics size={50} color="#b430a6" /></Link>

    </div>
  );
}
