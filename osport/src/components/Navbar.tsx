import {
  HiHome, HiUser, HiSearch, HiPlus,
} from 'react-icons/hi';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isLogged, userId } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-900 border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link
          href="/recherche"
          passHref
          className=" inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 hover:text-black group cursor-pointer"
        >
          <HiSearch size={24} color="#f9fafb" />
          <span className="sr-only">Search</span>
        </Link>
        <Link
          href="/"
          passHref
          className=" inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 hover:text-black group cursor-pointer"
        >
          <HiHome size={24} color="#f9fafb" />
          <span className="sr-only">Home</span>
        </Link>
        <Link
          href={isLogged ? `/profil/${userId}` : '/connexion'}
          passHref
          className=" inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 hover:text-black group cursor-pointer"
        >
          <HiUser size={24} color="#f9fafb" />
          <span className="sr-only">{isLogged ? 'Profil' : 'Connexion'}</span>
        </Link>
        <Link
          href={isLogged ? '/ajouter' : '/connexion'}
          passHref
          className=" inline-flex flex-col items-center justify-center px-5 hover:text-sky-600 group cursor-pointer"
        >
          <HiPlus size={24} color="#f9fafb" />
          <span className="sr-only">Add</span>
        </Link>
      </div>
    </div>
  );
}
