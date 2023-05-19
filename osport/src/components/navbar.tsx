import { HiHome, HiUser } from 'react-icons/hi2';
import { HiSearch, HiPlus } from 'react-icons/hi';

export default function Navbar() {
  return (

    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" className=" border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group ">
          <HiSearch size={24} color="#0343f4" />
          <span className="sr-only">Search</span>
        </button>
        <button data-tooltip-target="tooltip-home" type="button" className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <HiHome size={24} color="#0343f4" />
          <span className="sr-only">Home</span>
        </button>
        <button data-tooltip-target="tooltip-home" type="button" className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <HiUser size={24} color="#0343f4" />
          <span className="sr-only">Profil</span>
        </button>
        <button data-tooltip-target="tooltip-home" type="button" className="bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <HiPlus size={24} color="#0343f4" />
          <span className="sr-only">Add</span>
        </button>

      </div>
    </div>

  );
}
