// Composant gérant la barre de navigation en vue mobile

import {
  HiHome, HiUser, HiSearch, HiPlus,
} from 'react-icons/hi';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isLogged, userId } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link
          href="/recherche"
          passHref
          className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer"
        >
          <HiSearch size={24} color="#0343f4" />
          <span className="sr-only">Search</span>
        </Link>
        <Link
          href="/"
          passHref
          className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer"
        >
          <HiHome size={24} color="#0343f4" />
          <span className="sr-only">Home</span>
        </Link>
        {/* Lien dépendant de l'état connecté ou non */}
        <Link
          href={isLogged ? `/profil/${userId}` : '/connexion'}
          passHref
          className="border-r border-[#3293ff] bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer"
        >
          <HiUser size={24} color="#0343f4" />
          <span className="sr-only">{isLogged ? 'Profil' : 'Connexion'}</span>
        </Link>
        <Link
          href="/ajouter"
          passHref
          className="bg-[#dbedf6] inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer"
        >
          <HiPlus size={24} color="#0343f4" />
          <span className="sr-only">Add</span>
        </Link>
      </div>
    </div>
  );
}
