// Context d'authentification. Gère l'état de connexion d'un visiteur
// et les états et fonctions liées.

import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { loginUser, getLoggedInUser, logoutUser } from '../services/userService';

// Typage des informations du contexte d'authentification
type authContextType = {
  // L'utilisateur est connecté ou non
  isLogged: boolean;
  // L'utilisateur est administrateur ou non
  isAdmin: boolean;
  // Fonction de connexion
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => Promise<void>;
  // Fonction de déconnexion
  logout: () => void;
  // ID de l'utilisateur connecté
  userId: string | null;
  // Nom de l'utilisateur connecté
  userName: string | null;
  // Affichage ou non de l'état de connexion (notifications)
  showLoggedStatus: boolean;
  // Fonction pour modifier showLoggedStatus (le passer sur true ou false)
  // eslint-disable-next-line no-unused-vars
  setShowLoggedStatus: (status: boolean) => void;
  // Message d'erreur en cas de problème d'authentification
  error: string;
};

// Valeurs par défaut du contexte d'authentification
const authContextDefaultValues: authContextType = {
  isLogged: false,
  isAdmin: false,
  login: async () => { },
  logout: () => { },
  userId: null,
  userName: null,
  showLoggedStatus: false,
  setShowLoggedStatus: () => { },
  error: '',
};

// Création du contexte d'authentification
const AuthContext = createContext<authContextType>(authContextDefaultValues);

// Hook pour accéder au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

// Typage des propriétés attendues pour le composant AuthProvider.
// La propriété "children" de type ReactNode, représente les composants enfants
// encapsulés par le composant AuthProvider.
type Props = {
  children: ReactNode;
};

// Composant AuthProvider fournisseur (Provider) du contexte d'authentification
export function AuthProvider({ children }: Props) {
  const router = useRouter();
  // Nouvel état pour ne pas rendre le composant pendant l'appel API.
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogState] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLoggedStatus, setShowLoggedStatus] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Utilisation d'un useEffect qui vérifie si un utilisateur est connecté en interrogeant l'API.
  // L'API va chercher un cookie d'authentification et si présent va decrypter les informations sur
  // l'utilisateur contenues dans le JWT pour nous les renvoyer.
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const response = await getLoggedInUser();
      if (response.success) {
        setLogState(true);
        setUserId(response.userId);
        setUserName(response.userName);
        setIsAdmin(response.isAdmin);
      }
      setLoading(false);
    };
    checkLoggedInUser();
  }, []);

  // Fonction de connexion et actions liées au login.
  const login = useCallback(async (email: string, password: string) => {
    // Appel à l'API pour tester les identifiants utilisateur.
    const response = await loginUser(email, password);
    // Si l'API authentifie correctement l'utilisateur on met l'etat is Logged sur true et on
    // modifie les états liés.
    if (response.success) {
      const userResponse = await getLoggedInUser();
      if (userResponse.success) {
        setLogState(true);
        setUserId(userResponse.userId);
        setUserName(userResponse.userName);
        setIsAdmin(userResponse.isAdmin);
        setError('');
        setShowLoggedStatus(true);
        // Redirection vers la page d'accueil après la connexion
        await router.push('/');
      }
    } else {
      setError(response.error ?? 'Erreur serveur');
    }
  }, [router]);

  // Fonction de déconnexion. On appelle l'API pour supprimer le cookie "token" et on modifie
  // nos états.
  const logout = useCallback(async () => {
    const response = await logoutUser();
    if (response.success) {
      setLogState(false);
      setUserId(null);
      setIsAdmin(false);
      setShowLoggedStatus(true);
      // Redirection vers la page d'accueil après la déconnexion
      router.push('/');
    } else {
      setError(response.error ?? 'Erreur serveur');
    }
  }, [router]);

  // Valeurs du contexte d'authentification que l'on va transmettre. UseMemo évite des récalculs de
  // de la valeur du contexte en la mémorisant tant qu'une dépendance ne change pas (optimisation).
  const value = useMemo(() => ({
    isLogged,
    isAdmin,
    login,
    logout,
    userId,
    userName,
    showLoggedStatus,
    setShowLoggedStatus,
    error,
  }), [error, isAdmin, isLogged, login, logout, showLoggedStatus, userId, userName]); // Dépendances

  // Si l'état est en chargement on ne rend pas le composant
  if (isLoading) {
    return null;
  }

  // Rendu du composant, à encapsuler au niveau le plus général pour que tous
  // les composants y aient accès
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
