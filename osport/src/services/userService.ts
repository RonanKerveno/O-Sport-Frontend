// Requêtes API liées aux utilisateurs.

import axios, { AxiosError } from 'axios';
import { API_URL } from './apiConfig';

// Typage TypeScript
interface ServerError {
  error: string;
}

// Test des identifiants et récupération du token JWT
export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    // Récupération du token de la réponse
    const { token } = response.data;

    return {
      success: true,
      token,
    };

    // gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: serverError.response.data.error,
        };
      }
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Recupération des données d'un utilisateur via son ID.
export async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    // Recupération des données de l'utilisateur
    const userData = response.data;

    return {
      success: true,
      user: userData,
    };

    // gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
}

// Récupèration la liste des sports préférés d'un utilisateur ciblé par son ID
export async function getAllSportsFromOneUser(userId: string) {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/sports`);

    // Récupération des données
    const userSportsData = response.data;

    return {
      success: true,
      sports: userSportsData,
    };

    // gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
}

// Récupèration la liste des événements auxquels un utilisateur ayant l’ID spécifié participe
export async function getAllEventsFromOneUser(userId: string) {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/events`);

    // Récupération des données
    const userEventsData = response.data;

    return {
      success: true,
      events: userEventsData,
    };

    // gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
}

// Récupèration la liste des événements créés par l'utilisateur ayant l’ID spécifié
export async function getAllEventsCreatedByOneUser(userId: string) {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/created-events`);

    // Récupération des données
    const createdEventsData = response.data;

    return {
      success: true,
      createdEvents: createdEventsData,
    };

    // gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
}
