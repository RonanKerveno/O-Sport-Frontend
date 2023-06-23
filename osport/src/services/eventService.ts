// Requêtes vers l'API sur les routes events.

import axios, { AxiosError } from 'axios';
import { API_URL } from './apiConfig';
import { EditEventData } from '../types';

// Typage TypeScript
interface ServerError {
  error: string;
}

// Récupération des données concernant tous les événements
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);

    // Tri des événements par date de début
    const sortedEvents = response.data.sort((a: {
      startingTime: string | number | Date;
    }, b: { startingTime: string | number | Date; }) => new Date(
      a.startingTime,
    ).getTime() - new Date(b.startingTime).getTime());

    return {
      success: true,
      events: sortedEvents,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La récupération des événements a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Récupération des données d'un événement identifié par son ID.
export const getOneEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${API_URL}/events/${eventId}`);

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
          error: "La récupération de l'événement a échoué",
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Création d'un événement.
export const createOneEvent = async (userId: string, eventData: EditEventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      event: response.data,
    };

    // gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La création de l\'événement a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Modification d'un événement.
export const updateOneEvent = async (eventId: string, eventData: EditEventData) => {
  try {
    const response = await axios.patch(`${API_URL}/events/${eventId}`, eventData, {
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
          error: 'La mise à jour de l\'événement a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Suppression d'un événement.
export const deleteOneEvent = async (eventId: string) => {
  try {
    await axios.delete(`${API_URL}/events/${eventId}`, {
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
          error: "La suppression de l'événement a échoué",
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};
