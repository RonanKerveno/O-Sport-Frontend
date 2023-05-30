import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';

// Création du type pour le contexte du toaster
type ToastContextType = {
  toastMessage: string;
  toastDuration: number;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setToastDuration: React.Dispatch<React.SetStateAction<number>>;
};

// Valeurs par défaut du contexte
const ToastContextDefaultValues: ToastContextType = {
  toastMessage: '',
  toastDuration: 7000,
  setToastMessage: () => {},
  setToastDuration: () => {},
};

// Création du contexte
const ToastContext = createContext<ToastContextType>(ToastContextDefaultValues);

// Hook pour accéder au contexte du toaster
export function useToast() {
  return useContext(ToastContext);
}

// Typage des propriétés attendues pour le composant AuthProvider.
// La propriété "children" de type ReactNode, représente les composants enfants
// encapsulés par le composant AuthProvider.
type Props = {
  children: ReactNode;
};

// Composant ToastProvider fournisseur (Provider) du contexte du toaster
export function ToastProvider({ children }: Props) {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastDuration, setToastDuration] = useState<number>(7000);

  // On fournit la valeur du message et la méthode pour le modifier

  const value = useMemo(() => ({
    toastMessage,
    toastDuration,
    setToastMessage,
    setToastDuration,
  }), [toastDuration, toastMessage]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
