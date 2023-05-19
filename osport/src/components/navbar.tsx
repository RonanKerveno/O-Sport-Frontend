import { HiHome, HiUser } from 'react-icons/hi2';
import { HiSearch, HiPlus } from 'react-icons/hi';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto border-t-2 border-[#b430a6]">
        <button type="button" className="bg-white inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group ">
          <Link href="/recherche"><HiSearch size={24} color="#b430a6" /><span className="sr-only">Search</span></Link>
        </button>
        <button type="button" className="bg-white inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/"><HiHome size={24} color="#b430a6" /></Link>
          <span className="sr-only">Home</span>
        </button>
        <button type="button" className="bg-white inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/connexion"><HiUser size={24} color="#b430a6" /></Link>
          <span className="sr-only">Profil</span>
        </button>
        <button type="button" className="bg-white inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href="/ajouter"><HiPlus size={24} color="#b430a6" /></Link>
          <span className="sr-only">Add</span>
        </button>

      </div>
    </div>

  );
}
