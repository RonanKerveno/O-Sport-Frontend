import {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';
import { authenticateUser } from '../services/authServiceTest';

// Définition du type de contexte d'authentification
type authContextType = {
  isLogged: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => void;
  logout: () => void;
  error: string;
};

// Valeurs par défaut du contexte d'authentification
const authContextDefaultValues: authContextType = {
  isLogged: false,
  // eslint-disable-next-line no-unused-vars
  login: () => {},
  logout: () => {},
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
  const [isLogged, setLogState] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fonction de connexion
  const login = (email: string, password: string) => {
    const isAuthenticated = authenticateUser(email, password);
    setLogState(isAuthenticated);

    if (!isAuthenticated) {
      setError('Email ou mot de passe invalide');
    } else {
      setError('');
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setLogState(false);
  };

  // Valeur du contexte d'authentification
  const value = useMemo(() => ({
    isLogged,
    login,
    logout,
    error,
  }), [error, isLogged]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
