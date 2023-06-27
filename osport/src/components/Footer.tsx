// Composant Pied de page

import Link from 'next/link';

export default function Footer() {
  return (

    <div className=" bg-slate-800 mb-16 lg:mb-0">
      <div className="xl:w-[1050px] mx-auto 2xl:ml-32">
        <ul className="flex flex-col md:flex-row gap-7 md:gap-14 justify-center items-center p-7 font-medium text-gray-200">
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
