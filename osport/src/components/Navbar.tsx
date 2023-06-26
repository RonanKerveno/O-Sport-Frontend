// Composant barre de navigation mobile

import {
  HiHome, HiUser, HiSearch, HiPlus,
} from 'react-icons/hi';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isLogged, userId } = useAuth();

  return (
    <div className="fixed bottom-0 z-50 w-full h-16 bg-gray-900">
      <div className="grid h-full grid-cols-4">
        <Link
          href="/"
          className="flex flex-col items-center justify-center px-5"
        >
          <HiHome size={24} color="#f9fafb" />
        </Link>
        <Link
          href="/recherche"
          className="flex flex-col items-center justify-center px-5"
        >
          <HiSearch size={24} color="#f9fafb" />
        </Link>
        <Link
          // Lien conditionnel selon que l'utilisateur soit connecté ou non.
          href={isLogged ? `/profil/${userId}` : '/connexion'}
          className="flex flex-col items-center justify-center px-5"
        >
          <HiUser size={24} color="#f9fafb" />
        </Link>
        <Link
          href={isLogged ? '/ajouter' : '/connexion'}
          className="flex flex-col items-center justify-center px-5"
        >
          <HiPlus size={24} color="#f9fafb" />
        </Link>
      </div>
    </div>
  );
}
