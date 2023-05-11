import {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';

type authContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  isLogged: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isLogged, setLogState] = useState<boolean>(false);

  const login = () => {
    setLogState(true);
  };

  const logout = () => {
    setLogState(false);
  };

  const value = useMemo(() => ({
    isLogged,
    login,
    logout,
  }), [isLogged]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
