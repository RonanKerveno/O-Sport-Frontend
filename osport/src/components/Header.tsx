// Composant En-tête

import { MdSportsSoccer } from 'react-icons/md';
import { FaUserSlash } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import Avvvatars from 'avvvatars-react';
import Link from 'next/link';

export default function Header() {
  const { isLogged, userId, userName } = useAuth();

  return (
    <header className=" bg-slate-900 text-white font-bold text-2xl py-7 px-4 mb-10 flex justify-between">
      <div className="flex items-center">
        <MdSportsSoccer size={30} />
        <div>&#39;Sport</div>
        <div className="text-sm ml-3">*démo</div>
      </div>
      <div>
        {/* Si l'utilisateur est connecté on génére son avatar, sinon on utilise une icône
        d'utilisateur non connecté */}
        {isLogged && userName
          ? <Link href={`/profil/${userId}`}><Avvvatars value={userName} size={32} /></Link>
          : <Link href="/connexion"><FaUserSlash size={30} /></Link>}
      </div>
    </header>
  );
}
