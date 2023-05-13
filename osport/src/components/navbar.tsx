import { HiHome, HiUser } from 'react-icons/hi2';
import { HiSearch, HiPlus } from 'react-icons/hi';

export default function Navbar() {
  return (
    <div className="flex">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button type="button" className=" border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group ">
          <a href="/recherche"><HiSearch size={24} color="#0343f4" /></a>
          <span className="sr-only">Search</span>
        </button>
        <button type="button" className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <a href="/"><HiHome size={24} color="#0343f4" /></a>
          <span className="sr-only">Home</span>
        </button>
        <button type="button" className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <a href="/profil/:1"><HiUser size={24} color="#0343f4" /></a>
          <span className="sr-only">Profil</span>
        </button>
        <button type="button" className="bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <a href="/evenement/:1"><HiPlus size={24} color="#0343f4" /></a>
          <span className="sr-only">Add</span>
        </button>

      </div>
    </div>

  );
}
