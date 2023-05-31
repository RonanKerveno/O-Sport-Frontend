import React from 'react';
import { MdSports } from 'react-icons/md';

function Custom404() {
  return (
    <div className="text-center m-7">
      <MdSports size={64} className="m-auto" />
      <h1 className="font-bold mt-5">404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous cherchez n&#39;existe pas.</p>
    </div>
  );
}

export default Custom404;
