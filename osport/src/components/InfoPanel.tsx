// Composant panneau d'information

import Link from 'next/link';

export default function InfoPanel() {
  return (
    <div className="bg-slate-200 md:w-auto rounded-md shadow-md mb-14">
      <div className="text-white font-medium bg-slate-700 p-4 rounded-t-md">
        <h2>Bienvenue sur O&#39;Sport <span className="text-xs">*démo</span></h2>
      </div>
      <p className="p-4">Besoin de compagnons de sport ? Créez un événement !
        Vous cherchez une idée d&#39;activité ?
        Trouvez l&#39;événement qui vous convient et inscrivez vous !
      </p>
      <p className="px-4 pb-4 font-medium text-sm">
        *Ceci est une démo avec des données fictives.
      </p>
      <Link href="/a-propos" className="flex justify-center text-slate-900 underline font-medium pb-3">
        En savoir plus
      </Link>
    </div>
  );
}
