// Page A propos

import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>À propos - osport</title>
      </Head>
      <section>
        <h1 className="text-xl font-bold uppercase mb-4">A propos de O&#39;Sport</h1>

        <h2 className="text-xl font-semibold mt-7 mb-2">Projet d&#39;apothéose école O&#39;Clock</h2>
        <p>
          O&#39;Sport est un projet engagé dans le cadre de la formation&nbsp;
          <a
            href="https://oclock.io/formations/developpeur-web-fullstack-javascript"
            className="font-medium underline"
          >
            O&#39;Clock Développeur Fullstack JS
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-7 mb-2">Objectif</h2>
        <p>
          Mise en place d’un site web pour mettre en relation des particuliers autour du sport.
          Le principe : un utilisateur peut proposer un événement sportif auquels d&#39;autres
          utilisateurs peuvent s&#39;inscrire.
        </p>

        <h2 className="text-xl font-semibold mt-7 mb-2">Démo</h2>
        <p>
          Le site est mis en ligne à titre de démonstration, avec des&nbsp;
          <span className="font-medium">données d&#39;utilisateurs et d&#39;événements fictives</span>.
          Les visiteurs peuvent intéragir avec le site à des fin de test : par exemple créer un
          compte, ajouter des événements ou s&#39;inscrire à des sorties...
          <span className="font-medium">mais cela reste purement
            fictionnel et ne débouche sur aucune événement réél.
          </span>
        </p>

        <h2 className="text-xl font-semibold mt-7 mb-2">L&#39;équipe</h2>
        <ul className="list-disc ml-5">
          <li className="mb-2">
            <a href="https://github.com/MeddyCHALDER" className="underline font-medium">Meddy Chalder</a>
          </li>
          <li className="mb-2">
            <a href="https://github.com/RonanKerveno" className="underline font-medium">Ronan Kerveno</a>
          </li>
          <li className="mb-2">
            <a href="https://github.com/LenoirEmmanuel" className="underline font-medium">Emmanuel Lenoir</a>
          </li>
          <li className="mb-2">
            <a href="https://github.com/Geraldine-Perez" className="underline font-medium">Géraldine Pérez</a>
          </li>
        </ul>
      </section>
    </>
  );
}
