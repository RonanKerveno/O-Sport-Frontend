// Pied de page

import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (

    <div>
      {isMobile ? (
        <div className=" rounded-lg m-1 dark:bg-gray-800 xl:left-1/2 bg-white text-gray-700 shadow-md mb-4">
          <div className="p-4 ">
            <ul className="flex flex-wrap justify-center items-center  text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li className="mr-4 hover:underline ">
                <Link href="/">À propos</Link>
              </li>
              <li>
                <Link href="/" className="mr-4 hover:underline ">Politique général</Link>
              </li>
              <li className="hover:underline">
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className=" rounded-lg m-1 dark:bg-gray-800 xl:left-1/2 bg-white text-gray-700 shadow-md mb-2">
          <div className="p-4 ">
            <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li className="mr-4 hover:underline ">
                <Link href="/">À propos</Link>
              </li>
              <li>
                <Link href="/" className="mr-4 hover:underline ">Politique général</Link>
              </li>
              <li className="hover:underline">
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>

  );
}
