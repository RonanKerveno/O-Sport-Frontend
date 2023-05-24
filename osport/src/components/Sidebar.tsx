// Composant gérant la barre de navigation en vue Desktop

import Link from 'next/link';
import { HiHome, HiUser } from 'react-icons/hi2';
import { HiSearch, HiPlus } from 'react-icons/hi';
import { IoIosFootball } from 'react-icons/io';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { isLogged, userId } = useAuth();
  return (
    <div className="flex bg-gray-900">
      <div className="flex flex-col h-screen p-3 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center ml-2 text-gray-100">
            <h2 className="text-xl font-bold flex flex-row"><IoIosFootball color="white" size={28} />O&#39;Sport</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm text-gray-100">
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-blue-600 hover:text-[#f9fafb]"
                >
                  <HiHome size={22} />
                  <span>Home</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/recherche"
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-blue-600 hover:text-[#f9fafb]"
                >
                  <HiSearch size={22} />
                  <span>Recherche</span>
                </Link>
              </li>
              <li className="rounded-sm">
                {/* Lien dépendant de l'état connecté ou non */}
                <Link
                  href={isLogged ? `/profil/${userId}` : '/connexion'}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-blue-600 hover:text-[#f9fafb]"
                >
                  <HiUser size={22} />
                  <span>Profil</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/ajouter"
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-blue-600 hover:text-[#f9fafb]"
                >
                  <HiPlus size={22} />
                  <span>Ajouter</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
