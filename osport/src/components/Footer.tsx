import Link from 'next/link';

export default function Footer() {
  return (

    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 mb-20">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="mr-4 hover:underline md:mr-6">
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
          </li>
          <li className="mr-4 hover:underline md:mr-6">
            <Link href="#" >Licensing</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>


  );
}
