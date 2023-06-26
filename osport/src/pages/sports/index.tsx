// Page admin d'édition des sports

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Sport, SportsListData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import {
  createOneSport, deleteOneSport, getAllSports, updateOneSport,
} from '@/services/sportService';
import router from 'next/router';
import Select from 'react-select';
import sportIconMap from '@/utils/sportIconMap';
import { sportNameConvert } from '@/utils/sportNameConvert';

export default function AddEvent() {
  // State gérant les messages d'erreur liés au requêtes API pour manipuler les sports.
  const [errorMessage, setErrorMessage] = useState('');

  // State gérant les demandes de confirmation des actions avant tout envoi de requête API.
  const [showConfirmation, setShowConfirmation] = useState(
    { create: false, update: false, delete: false },
  );

  // State gérant les modifications des données de la liste des sports.
  const [sportsList, setSportsList] = useState<SportsListData>([]);

  // State gérant le sport séléctionné dans la liste.
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  // usEffect gérant la recupération de la liste des sports via l'API.
  useEffect(() => {
    const fetchSports = async () => {
      const response = await getAllSports();
      if (response.success) {
        setSportsList(response.sports);
      }
    };
    fetchSports();
  }, []);

  // State gérant le nom du nouveau sport à ajouter.
  const [newSportName, setNewSportName] = useState<string>('');

  // State gérant la confirmation du nouveau nom d'un sport (création et modification).
  const [confirmSportName, setConfirmSportName] = useState('');

  // Fonction gérant la demande de création d'un nouveau sport
  const handleNewSport = async () => {
    if (newSportName) {
      setShowConfirmation({ create: true, update: false, delete: false });
      setConfirmSportName(newSportName);
    }
  };

  // State gérant la modification d'un sport de la liste.
  const [editSportName, setEditSportName] = useState<string>('');

  // Fonction gérant l'appel API pour la création demandée d'un nouveau sport.
  const confirmNewSport = async () => {
    if (newSportName) {
      const sportData: Sport = {
        id: '', // L'ID sera généré côté serveur.
        name: newSportName,
      };
      const response = await createOneSport(sportData);
      if (response.success) {
        const updatedSportsList = await getAllSports();
        if (updatedSportsList.success) {
          setSportsList(updatedSportsList.sports);
          setErrorMessage('Sport ajouté avec succès');
        }
        setNewSportName('');
        setEditSportName('');
        setSelectedSport(null);
      } else {
        setErrorMessage(response.error || "Une erreur s'est produite lors de l'ajout du sport");
      }
      setShowConfirmation({ create: false, update: false, delete: false });
    }
  };

  // Fonction gérant la demande d'édition d'un sport.
  const handleEditSport = async () => {
    if (selectedSport && editSportName) {
      setShowConfirmation({ create: false, update: true, delete: false });
      setConfirmSportName(editSportName);
    }
  };

  // Fonction gérant l'appel API pour la modification demandée d'un sport.
  const confirmEditSport = async () => {
    if (selectedSport && editSportName) {
      const updatedSport: Sport = {
        ...selectedSport,
        name: editSportName,
      };
      const response = await updateOneSport(selectedSport.id, updatedSport);
      if (response.success) {
        const updatedSportsList = await getAllSports();
        if (updatedSportsList.success) {
          setSportsList(updatedSportsList.sports);
          setErrorMessage('Sport modifié avec succès');
        }
        setNewSportName('');
        setEditSportName('');
        setSelectedSport(null);
      } else {
        setErrorMessage(response.error || "Une erreur s'est produite lors de la modification du sport");
      }
      setShowConfirmation({ create: false, update: false, delete: false });
    }
  };

  // Fonction gérant la demande de suppression d'un sport.
  const handleDeleteSport = async () => {
    if (selectedSport) {
      setShowConfirmation({ create: false, update: false, delete: true });
      setConfirmSportName(selectedSport.name);
    }
  };

  // Fonction gérant l'appel API pour la suppression demandée d'un sport.
  const confirmDeleteSport = async () => {
    if (selectedSport) {
      const response = await deleteOneSport(selectedSport.id);
      if (response.success) {
        const updatedSportsList = await getAllSports();
        if (updatedSportsList.success) {
          setSportsList(updatedSportsList.sports);
          setErrorMessage('Sport supprimé avec succès');
        }
        setNewSportName('');
        setEditSportName('');
        setSelectedSport(null);
      } else {
        setErrorMessage(response.error || "Une erreur s'est produite lors de la suppression du sport");
      }
      setShowConfirmation({ create: false, update: false, delete: false });
    }
  };

  const handleSelectSport = (option: { value: string; label: React.ReactNode } | null) => {
    const sport = sportsList.find((oneSport) => oneSport.id === (option ? option.value : '')) || null;
    setSelectedSport(sport);
    if (sport) {
      setEditSportName(sport.name);
    } else {
      setEditSportName('');
    }
  };

  // Définition des options pour le composant React Select.
  // Définition des options pour le composant React Select.
  const selectOptions = sportsList.map((sport) => {
    const SportIcon = sportIconMap[sportNameConvert(sport.name)] || sportIconMap.Sports;
    return {
      value: sport.id,
      label: (
        <div className="flex items-center gap-2">
          <SportIcon size={22} />
          <div>{sport.name}</div>
        </div>
      ),
    };
  });

  // Gestion des autorisations de l'utilisateur.

  // Récupération du statut admin de l'utilisateur connecté via le Context d'authentification.
  const { isAdmin } = useAuth();

  // State gérant le statut authrisé ou non de l'utilisateur connecté.
  const [isAuthorized, setIsAuthorized] = useState(false);

  // State gérant l'attente du chargement lors des requêtes API.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect gérant les actions liées au statut administrateur ou non de l'utilisateur connecté.
  useEffect(() => {
    // Si non admin redirection vers Home.
    if (!isAdmin) {
      router.push('/');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [isAdmin]);

  if (isLoading) {
    // Pendant que nous vérifions l'authentification, nous affichons ce message
    return <h1>Verification en cours...</h1>;
  } if (!isAuthorized) {
    // Si l'utilisateur n'est pas autorisé, nous affichons ce message
    return <h1>Non autorisé !</h1>;
  }
  return (
    <>
      <Head>
        <title>Modification des sports</title>
      </Head>

      <section className="text-gray-800">

        <h1 className="text-red-500 text-xl font-bold text-center uppercase mb-10"> Modification des sports (Admin)</h1>

        {errorMessage
          && (
            <p className={errorMessage.includes('succès') ? 'text-green-600 mb-7' : 'text-red-500 mb-7'}>
              {errorMessage}
            </p>
          )}

        <h2 className="text-lg font-semibold mb-1">Sélection</h2>
        <Select
          value={selectedSport ? {
            value: selectedSport.id,
            label: (
              <div className="flex items-center gap-2">
                {React.createElement(sportIconMap[sportNameConvert(selectedSport.name)]
                  || sportIconMap.Sports, { size: 22 })}
                <div>{selectedSport.name}</div>
              </div>
            ),
          } : null}
          options={selectOptions}
          onChange={handleSelectSport}
          placeholder="Sélectionner un sport"
          isClearable
          className="mb-4"
        />

        <button
          className="border bg-red-700 hover:bg-red-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded mb-7"
          type="button"
          onClick={handleDeleteSport}
        >Supprimer le sport (à éviter !)
        </button>

        <h2 className="text-lg font-semibold mb-1">Modification</h2>
        <div className="mb-7">
          <input
            type="text"
            value={editSportName}
            placeholder="Sélectionner un sport plus haut"
            onChange={(e) => setEditSportName(e.target.value)}
            className="text-gray-700 shadow-md border py-2 px-3 w-full mb-4"
          />
          <button
            className="border bg-orange-700 hover:bg-orange-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleEditSport}
          >Modifier le sport
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-1">Ajout</h2>
        <div className="">
          <input
            type="text"
            value={newSportName}
            placeholder="Entrer le nom du sport"
            onChange={(e) => setNewSportName(e.target.value)}
            className="text-gray-700 shadow-md border py-2 px-3 w-full mb-4"
          />
          <button
            className="border bg-green-700 hover:bg-green-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleNewSport}
          >Ajouter un sport
          </button>
        </div>
        {showConfirmation.create && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded mx-2">
              <p className="mb-3">Êtes-vous sûr de vouloir ajouter le sport &#34;{confirmSportName}&#34; ?</p>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" onClick={() => setShowConfirmation({ create: false, update: false, delete: false })}>
                  Annuler
                </button>
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={confirmNewSport}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
        {showConfirmation.update && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded mx-2">
              <p className="mb-3">Êtes-vous sûr de vouloir modifier le sport &#34;{confirmSportName}&#34; ?</p>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" onClick={() => setShowConfirmation({ create: false, update: false, delete: false })}>
                  Annuler
                </button>
                <button type="button" className="bg-orange-500 text-white px-4 py-2 rounded" onClick={confirmEditSport}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
        {showConfirmation.delete && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded mx-2">
              <p className="mb-3">Êtes-vous sûr de vouloir supprimer le sport &#34;{confirmSportName}&#34; ?</p>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" onClick={() => setShowConfirmation({ create: false, update: false, delete: false })}>
                  Annuler
                </button>
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDeleteSport}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
