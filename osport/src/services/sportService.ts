// Requêtes vers l'API sur les routes sports.

import { Sport } from '@/types';
import axios, { AxiosError } from 'axios';
import { API_URL } from './apiConfig';

// Typage TypeScript
interface ServerError {
  error: string;
}

// Récupération de la liste de tous les sports
export const getAllSports = async () => {
  try {
    const response = await axios.get(`${API_URL}/sports`);
    const sportsData = response.data;

    // Tri des sports par ordre alphabétique
    const sortedSportsData = sportsData.sort(
      (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
    );

    return {
      success: true,
      sports: sortedSportsData,
    };

    // Gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
};

// Récupération d'un sport ciblé par l'ID
export const getOneSport = async (sportId: string) => {
  try {
    const response = await axios.get(`${API_URL}/sports/${sportId}`);
    const sportData = response.data;

    return {
      success: true,
      sport: sportData,
    };

    // Gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
};

// Création d'un sport (admin)
export const createOneSport = async (sportData: Sport) => {
  try {
    const response = await axios.post(`${API_URL}/sports`, sportData, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      event: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La création du sport a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Modification d'un sport (admin)
export const updateOneSport = async (sportId: string, sportData: Sport) => {
  try {
    const response = await axios.patch(`${API_URL}/sports/${sportId}`, sportData, {
      withCredentials: true,
    });

    return {
      success: true,
      event: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La mise à jour du sport a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Suppression d'un sport (admin)
export const deleteOneSport = async (sportId: string) => {
  try {
    await axios.delete(`${API_URL}/sports/${sportId}`, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La suppression du sport a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};
