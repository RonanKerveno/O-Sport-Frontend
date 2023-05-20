// Contexte d'authentification. Gère l'état de connexion d'un visiteur
// et les états et fonctions liées.

import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { loginUser } from '../services/userService';

// Typage TypeScript des informations extraites du token JWT
interface DecodedToken {
  userId: string;
}

// Typage des informations du contexte d'authentification
type authContextType = {
  // L'utilisateur est connecté ou non
  isLogged: boolean;
  // Fonction de connexion
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => Promise<void>;
  // Fonction de déconnexion
  logout: () => void;
  // ID de l'utilisateur connecté
  userId: string | null;
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
  login: async () => { },
  logout: () => { },
  userId: null,
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
  const [userId, setUserId] = useState<string | null>(null);
  const [showLoggedStatus, setShowLoggedStatus] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Utilisations d'un useEffect qui vérifie la présence d'un token JWT dans le localstorage
  // Cela permet de vérifier si l'utilisateur a déjà une session ouverte au montage du composant.
  useEffect(() => {
    // "localStorage" est une propriété de l'objet window indisponible lors du rendu coté
    // serveur (SSR). On s'assure que le code s'exécute dans un environnement de navigateur
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setLogState(true);
        // On extrait l'ID de l'utilisateur connecté depuis le token.
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.userId);
      }
    }
    // une fois que vous avez vérifié, vous pouvez arrêter le chargement
    setLoading(false);
  }, []);

  // Fonction de connexion et actions liées au login.
  const login = useCallback(async (email: string, password: string) => {
    // Appel à l'API pour tester les identifiants utilisateur.
    const response = await loginUser(email, password);
    // Si l'API authentifie correctement l'utilisateur on met l'etat is Logged sur true et on
    // modifie les états liés.
    if (response.success) {
      localStorage.setItem('token', response.token);
      setLogState(true);
      // On extrait l'ID de l'utilisateur connecté depuis le token.
      const decoded = jwtDecode<DecodedToken>(response.token);
      setUserId(decoded.userId);
      setError('');
      setShowLoggedStatus(true);
      // Redirection vers la page d'accueil après la connexion
      await router.push('/');
    } else {
      setError(response.error ?? 'Erreur serveur');
    }
  }, [router]);

  // Fonction de déconnexion. On supprime le token JWT du localStorage et on modifie nos états.
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setLogState(false);
    setUserId(null);
    setShowLoggedStatus(true);
    // Redirection vers la page d'accueil après la déconnexion
    router.push('/');
  }, [router]);

  // Valeurs du contexte d'authentification que l'on va transmettre. UseMemo évite des récalculs de
  // de la valeur du contexte en la mémorisant tant qu'une dépendance ne change pas (optimisation).
  const value = useMemo(() => ({
    isLogged,
    login,
    logout,
    userId,
    showLoggedStatus,
    setShowLoggedStatus,
    error,
  }), [error, isLogged, login, logout, showLoggedStatus, userId]); // Dépendances

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
