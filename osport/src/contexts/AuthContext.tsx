import {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import { loginUser } from '../services/userService';

interface DecodedToken {
  userId: string;
}

// Définition du type de contexte d'authentification
type authContextType = {
  isLogged: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userId: string | null;
  error: string;
};

// Valeurs par défaut du contexte d'authentification
const authContextDefaultValues: authContextType = {
  isLogged: false,
  login: async () => { },
  logout: () => { },
  userId: null,
  error: '',
};

// Création du contexte d'authentification
const AuthContext = createContext<authContextType>(authContextDefaultValues);

// Hook pour accéder au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

// Props du composant AuthProvider
type Props = {
  children: ReactNode;
};

// Composant fournisseur du contexte d'authentification
export function AuthProvider({ children }: Props) {
  // nouvel état pour gérer le chargement
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogState] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  // Utiliser useEffect pour vérifier la présence d'un token une fois le composant monté
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setLogState(true);
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.userId);
      }
    }
    // une fois que vous avez vérifié, vous pouvez arrêter le chargement
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);

    if (response.success) {
      localStorage.setItem('token', response.token);
      setLogState(true);
      const decoded = jwtDecode<DecodedToken>(response.token);
      setUserId(decoded.userId);
      setError('');
    } else {
      setError(response.error ?? 'Erreur serveur');
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setLogState(false);
    setUserId(null);
  };

  // Valeur du contexte d'authentification
  const value = useMemo(() => ({
    isLogged,
    login,
    logout,
    userId,
    error,
  }), [error, isLogged, userId]);

  // Si l'état est en chargement, ne pas rendre le composant
  if (isLoading) {
    return null; // ou retourner un composant de chargement
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
