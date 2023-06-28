// Page 404

import Link from 'next/link';
import React from 'react';
import { MdSports } from 'react-icons/md';

function Custom404() {
  return (
    <section className="text-center text-slate-800">
      <Link href="/">
        <MdSports size={128} className="m-auto hover:text-slate-700 transition-colors duration-1000" />
      </Link>
      <h1 className="font-bold text-xl mb-5 uppercase">404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous cherchez n&#39;existe pas.</p>
    </section>
  );
}

export default Custom404;
