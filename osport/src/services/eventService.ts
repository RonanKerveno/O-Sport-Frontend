import axios, { AxiosError } from 'axios';
import { API_URL } from './apiConfig';
import { EditEventData } from '../types';

// Typage TypeScript
interface ServerError {
  error: string;
}

export const createOneEvent = async (userId: string, eventData: EditEventData) => {
  try {
    const response = await axios.post(`${API_URL}/events/${userId}`, eventData, {
      withCredentials: true,
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

export const updateEvent = async (eventId: string, eventData: EditEventData) => {
  try {
    const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, {
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
