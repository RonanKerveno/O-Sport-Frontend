import axios, { AxiosError } from 'axios';
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
      withCredentials: true,
    });

    return {
      success: true,
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
};

// Récupération des informations de bases sur l'utilisateur connecté.
// L'API renvoit ces informations à partir du token JWT encapsulé dans le cookie.
export const getLoggedInUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/login-info`, {
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });

    // Récupération des données de l'utilisateur.
    const { success, userId, isAdmin } = response.data;

    return {
      success,
      userId,
      isAdmin,
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
};

// Déconnexion de l'utilisateur. L'API va supprimer le cookie d'authentification en
// l'écrasant par un cookie expirant immédiatement.
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/users/logout`, {}, {
      withCredentials: true,
    });

    return {
      success: true,
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
};

// Recupération des données d'un utilisateur via son ID.
export const getUserById = async (userId: string) => {
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
};

// Recupération des données privées d'un utilisateur via son ID.
// Le cookie a été récupéré depuis le rendu SSR.
export const getUserByIdPrivate = async (userId: string, cookie: string | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/private`, {
      // Ajout du cookie dans l'en-tête de la requête
      headers: {
        Cookie: cookie,
      },
      withCredentials: true, // Permet l'envoi du cookie dans la requête
    });
    // Recupération des données de l'utilisateur
    const userPrivateData = response.data;

    return {
      success: true,
      userPrivate: userPrivateData,
    };

    // gestion des erreurs
  } catch (error) {
    return {
      success: false,
    };
  }
};

// Récupèration la liste des sports préférés d'un utilisateur ciblé par son ID
export const getAllSportsFromOneUser = async (userId: string) => {
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
};

// Récupèration la liste des événements auxquels un utilisateur ayant l’ID spécifié participe
export const getAllEventsFromOneUser = async (userId: string) => {
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
};

// Récupèration la liste des événements créés par l'utilisateur ayant l’ID spécifié
export const getAllEventsCreatedByOneUser = async (userId: string) => {
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
};
