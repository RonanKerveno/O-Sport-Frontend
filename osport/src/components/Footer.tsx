// Composant Pied de page

import Link from 'next/link';

export default function Footer() {
  return (

    <div>
      <div className=" bg-slate-800 mb-16">
        <ul className="flex flex-col gap-7 justify-center items-center p-7 font-medium text-gray-200">
          <li>
            <Link href="/">À propos</Link>
          </li>
          <li>
            <Link href="/">Politique générale</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}
