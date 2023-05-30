// Page de création d'un événement

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Sport, SportsListData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import {
  createOneSport, deleteOneSport, getAllSports, updateOneSport,
} from '@/services/sportService';
import router from 'next/router';

export default function AddEvent() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(
    { create: false, update: false, delete: false },
  );
  const [confirmSportName, setConfirmSportName] = useState('');
  const { isAdmin } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sportsList, setSportsList] = useState<SportsListData>([]);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [newSportName, setNewSportName] = useState<string>('');
  const [editSportName, setEditSportName] = useState<string>('');

  useEffect(() => {
    // Vérification de l'égalité des userId
    if (!isAdmin) {
      router.push('/');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await getAllSports();
      if (response.success) {
        setSportsList(response.sports);
      }
    };

    fetchSports();
  }, []);

  const handleSelectSport = (id: string) => {
    const sport = sportsList.find((oneSport) => oneSport.id.toString() === id) || null;
    setSelectedSport(sport);
    if (sport) {
      setEditSportName(sport.name);
    }
  };

  const handleNewSport = async () => {
    if (newSportName) {
      setShowConfirmation({ create: true, update: false, delete: false });
      setConfirmSportName(newSportName);
    }
  };

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

  const handleEditSport = async () => {
    if (selectedSport && editSportName) {
      setShowConfirmation({ create: false, update: true, delete: false });
      setConfirmSportName(editSportName);
    }
  };

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

  const handleDeleteSport = async () => {
    if (selectedSport) {
      setShowConfirmation({ create: false, update: false, delete: true });
      setConfirmSportName(selectedSport.name);
    }
  };

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
      <div>
        <div className="m-7 text-red-500 text-xl font-sans font-bold text-center border">
          <h1> Modification des sports (Admin)</h1>
        </div>
        {errorMessage
          && (
            <p className={errorMessage.includes('succès') ? 'text-green-600 mt-3 ml-7' : 'text-red-500 mt-3 ml-4'}>
              {errorMessage}
            </p>
          )}
      </div>
      <div>
        <div className="m-8">
          <select
            value={selectedSport ? selectedSport.id : ''}
            onChange={(e) => handleSelectSport(e.target.value)}
          >
            <option value="" className="border-2">Sélectionner un sport</option>
            {sportsList.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
          <button
            className="ml-4 border bg-red-700 hover:bg-red-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleDeleteSport}
          >Supprimer le sport (à éviter !)
          </button>
        </div>

        <div className="m-8">
          <input
            type="text"
            value={editSportName}
            onChange={(e) => setEditSportName(e.target.value)}
          />
          <button
            className="ml-4 border bg-orange-700 hover:bg-orange-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleEditSport}
          >Modifier le sport
          </button>
        </div>
      </div>

      <div className="m-8">
        <input
          type="text"
          value={newSportName}
          onChange={(e) => setNewSportName(e.target.value)}
        />
        <button
          className="ml-4 border bg-green-700 hover:bg-green-900 transition-colors duration-1000 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleNewSport}
        >Ajouter un sport
        </button>
      </div>
      {showConfirmation.create && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
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
          <div className="bg-white p-4 rounded">
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
          <div className="bg-white p-4 rounded">
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
    </>
  );
}
