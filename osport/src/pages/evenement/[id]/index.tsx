// Page affichant un événement

/* eslint-disable react/no-unescaped-entities */
import { HiUserCircle, HiUserGroup } from 'react-icons/hi2';
import { MdSportsHandball } from 'react-icons/md';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Visualisation d'un événement en fonction de son ID
export default function Event() {
  // On récupère l'Id dans l'url de la route paramètrée
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Evénement {id} - osport</title>
      </Head>
      <div className=" mb-1 text-[#b430a6] text-center"><h1>Evénement {id}</h1></div>
      <div>
        <div className=" mb-1 bg-white text-gray-700 shadow-md ">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <HiUserGroup className="text-5xl mr-3" />
              <span className="text-xl">5/15</span>
            </span>
            <span className="text-right"><MdSportsHandball size={50} /></span>
          </div>
          <div className="text-center text-4xl font-bold p-6">Titre événement</div>
          <div className="text-left mb-1">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" type="submit">
              S'inscrire
            </button>
          </div>
        </div>
        <div className=" mb-1 p-8 bg-white text-gray-700 shadow-md">
          <div className="mt-2 mb-2">Ville</div>
          <div className="mt-2 mb-2">Adresse</div>
          <div className="mt-2 mb-2">Date de rendez-vous</div>
          <div className="mt-2 mb-2">Heure de rendez-vous</div>
          <div className="mt-2 mb-2">Sport</div>
        </div>

        <div className=" mb-1 p-6 bg-white text-gray-700 shadow-md">
          <span className="text-2xl">Description de l'événement :</span> <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing
        </div>

        <div className=" mb-1 flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Participant à l'événement :</span>
          <span className="flex flex-col items-center">
            <HiUserCircle size={30} />
            <span>Jude</span>
          </span>
        </div>
        <div className=" flex flex-row space-x-4 p-6 bg-white text-gray-700 shadow-md">
          <span>Créateur de l'évènement :</span>
          <span className="flex flex-col items-center">
            <HiUserCircle size={30} />
            <span>Jude</span>
          </span>
        </div>
      </div>
    </>

  );
}
