// Pied de page

import Link from 'next/link';

export default function Footer() {
  return (

    <div>
      <div className="dark:bg-gray-800 bg-white text-gray-700 shadow-md mb-16">
        <ul className="flex flex-col gap-4 justify-center items-center p-7 text-sm font-medium text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/">À propos</Link>
          </li>
          <li>
            <Link href="/">Politique général</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}
