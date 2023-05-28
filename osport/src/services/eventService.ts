import axios, { AxiosError } from 'axios';
import { API_URL } from './apiConfig';
import { EditEventData } from '../types';

// Typage TypeScript
interface ServerError {
  error: string;
}

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      withCredentials: true,
    });

    return {
      success: true,
      events: response.data,
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

export const getOneEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${API_URL}/events/${eventId}`, {
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

export const createOneEvent = async (userId: string, eventData: EditEventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, {
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

export const updateOneEvent = async (eventId: string, eventData: EditEventData) => {
  try {
    const response = await axios.patch(`${API_URL}/events/${eventId}`, eventData, {
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

export const deleteOneEvent = async (eventId: string) => {
  try {
    await axios.delete(`${API_URL}/events/${eventId}`, {
      withCredentials: true,
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
