/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import { MdSportsSoccer } from 'react-icons/md';
// Composant En-tête


export default function Header() {
  return (
    <div>
      <div className="text-gradient-to-tr from-red-600 to-blue-400 text-2xl font-sans font-bold text-center p-3 bg-slate-100 flex flex-row justify-center items-center">
        <MdSportsSoccer size={30} /><div>'Sport</div>
      </div>
    </div>
  );
}
