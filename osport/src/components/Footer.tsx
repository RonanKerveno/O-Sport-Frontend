// Composant Pied de page

import Link from 'next/link';

export default function Footer() {
  return (

    <div className=" bg-slate-800 mb-16 md:mb-0">
      <div>
        <ul className="flex flex-col gap-7 justify-center items-center p-7 font-medium text-gray-200">
          <li>
            <Link href="/a-propos">À propos</Link>
          </li>
          <li>
            <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}
