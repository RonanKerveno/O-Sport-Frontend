// Requêtes vers l'API sur les routes users.

import axios, { AxiosError } from 'axios';
import { UserPublicData, UserPrivateData } from '@/types';
import { API_URL } from './apiConfig';

// Typage TypeScript
interface ServerError {
  error: string;
}

// Test des identifiants et récupération du token JWT
export const loginUser = async (email: string, password: string) => {
  try {
    await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    }, {
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
          error: serverError.response.data.error,
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Récupération des informations de bases sur l'utilisateur connecté.
// L'API renvoit ces informations à partir du token JWT encapsulé dans le cookie.
export const getLoggedInUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/login-info`, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });
    const {
      success, userId, userName, isAdmin,
    } = response.data;

    return {
      success,
      userId,
      userName,
      isAdmin,
    };

    // Gestion des erreurs
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
      error: 'Erreur serveur inattendue',
    };
  }
};

// Déconnexion de l'utilisateur. L'API va supprimer le cookie d'authentification en
// l'écrasant par un cookie expirant immédiatement.
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/users/logout`, {}, {
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
          error: 'La déconnexion a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Recupération des données d'un utilisateur via son ID.
export const getOneUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    const userData = response.data;

    return {
      success: true,
      user: userData,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La récupération des données utilisateur a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Recupération des données de tous les utilisateurs.
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/`);
    const usersData = response.data;

    return {
      success: true,
      user: usersData,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La récupération des données utilisateurs a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Recupération des données privées d'un utilisateur via son ID.
export const getUserByIdPrivate = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/private`, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });
    const userPrivateData = response.data;

    return {
      success: true,
      userPrivate: userPrivateData,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La récupération des données utilisateur a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Récupèration la liste des sports préférés d'un utilisateur ciblé par son ID
export const getAllSportsFromOneUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/sports`);
    const userSportsData = response.data;

    return {
      success: true,
      sports: userSportsData,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La récupération de la liste des sports a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Récupèration la liste des événements auxquels un utilisateur ayant l’ID spécifié participe
export const getAllEventsFromOneUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/events`);
    const userEventsData = response.data;

    return {
      success: true,
      events: userEventsData,
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

// Récupèration la liste des événements créés par l'utilisateur ayant l’ID spécifié
export const getAllEventsCreatedByOneUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/created-events`);
    const createdEventsData = response.data;

    return {
      success: true,
      createdEvents: createdEventsData,
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

// Création d'un nouvel utilisateur.
export const createOneUser = async (userData: UserPublicData & UserPrivateData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      user: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La céation du profil a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Mise à jour des informations de l’utilisateur ayant l’ID spécifié.
export const updateOneUser = async (userData: UserPublicData & UserPrivateData) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${userData.id}`, userData, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      user: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La mise à jour du profil a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Supprime un utilisateur ciblé par l’ID.
export const deleteOneUser = async (userId: string, currentUserId: string, isAdmin: boolean) => {
  try {
    const url = (currentUserId !== userId && isAdmin) ? `${API_URL}/users/${userId}/from-admin` : `${API_URL}/users/${userId}`;
    const response = await axios.delete(url, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      message: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: 'La suppression du profil a échoué',
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
export const addOneUserToOneEvent = async (userId: string, eventId: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/events/${eventId}`, {}, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      message: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: serverError.response.data.error || "L'ajout de l'utilisateur à l'événement a échoué",
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};

// Ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
export const deleteOneUserFromOneEvent = async (userId: string, eventId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}/events/${eventId}`, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    return {
      success: true,
      message: response.data,
    };

    // Gestion des erreurs
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          success: false,
          error: "La suppression de l'utilisateur a échoué",
        };
      }
    }
    return {
      success: false,
      error: 'Erreur serveur inattendue',
    };
  }
};
