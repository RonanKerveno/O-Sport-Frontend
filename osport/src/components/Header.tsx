// Composant En-tête

import { MdSportsSoccer } from 'react-icons/md';
import { FaUserSlash } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import Avvvatars from 'avvvatars-react';
import Link from 'next/link';
import {
  HiHome, HiPlus, HiSearch, HiUser,
} from 'react-icons/hi';
import router from 'next/router';

export default function Header() {
  const { isLogged, userId, userName } = useAuth();

  // Fonction pour vérifier si le lien est actif
  const isLinkActive = (href: string) => router.pathname === href;

  return (
    <header className="sticky top-0 bg-slate-900 text-white py-7 px-4 lg:pl-7 lg:pr-8 mb-10 lg:mb-0 lg:h-screen flex lg:flex-col justify-between items-center">
      <div>
        <Link href="/" className="flex items-center font-bold text-2xl">
          <MdSportsSoccer size={30} />
          <div>&#39;Sport</div>
          <div className="text-sm ml-3">*démo</div>
        </Link>
        <div className="hidden lg:flex flex-col gap-10 font-semibold mt-20">
          <Link
            href="/"
            className={`flex gap-3 ${isLinkActive('/') ? 'text-slate-400' : ''}`}
          >
            <HiHome size={24} />
            <p>Accueil</p>
          </Link>
          <Link
            href="/recherche"
            className={`flex gap-3 ${router.pathname.startsWith('/recherche') ? 'text-slate-400' : ''}`}
          >
            <HiSearch size={24} />
            <p>Recherche</p>
          </Link>
          <Link
            // Lien conditionnel selon que l'utilisateur soit connecté ou non.
            href={isLogged ? `/profil/${userId}` : '/connexion'}
            className={`flex gap-3 ${router.pathname.startsWith('/profil') ? 'text-slate-400' : ''}`}
          >
            <HiUser size={24} />
            <p>Profil</p>
          </Link>
          <Link
            href={isLogged ? '/ajouter' : '/connexion'}
            className={`flex gap-3 ${isLinkActive('/ajouter') ? 'text-slate-400' : ''}`}
          >
            <HiPlus size={24} />
            <p>Proposer</p>
          </Link>
        </div>
      </div>
      <div>
        {/* Si l'utilisateur est connecté on génère son avatar, sinon on utilise une icône
        d'utilisateur non connecté */}
        {isLogged && userName
          ? (
            <Link href={`/profil/${userId}`} className="flex items-center gap-4">
              <Avvvatars value={userName} size={32} />
              <span className="text-sm font-bold hidden lg:block">{userName}</span>
            </Link>
          ) : (
            <Link href="/connexion" className="flex items-center gap-4">
              <FaUserSlash size={28} />
              <p className="text-sm hidden lg:block">Non connecté</p>
            </Link>
          )}
      </div>
    </header>
  );
}
