/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import { MdSportsSoccer } from 'react-icons/md';
// Composant En-tête

export default function Header() {
  return (
    <header className=" bg-slate-900 text-white font-bold text-2xl py-7 pl-4 mb-10 flex items-center">
      <MdSportsSoccer size={30} /><div>'Sport</div>
    </header>
  );
}
