// Context du toaster.
// Vise à déclencher un toaster avec un message associé, d'un composant à un autre.

import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';

// Création du type pour le Context du toaster
type ToastContextType = {
  toastMessage: string;
  toastDuration: number;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setToastDuration: React.Dispatch<React.SetStateAction<number>>;
};

// Valeurs par défaut du Context
const ToastContextDefaultValues: ToastContextType = {
  toastMessage: '',
  toastDuration: 7000,
  setToastMessage: () => { },
  setToastDuration: () => { },
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
// On fournit le contenu du message, sa durée d'affichage et les méthodes de modification.
export function ToastProvider({ children }: Props) {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastDuration, setToastDuration] = useState<number>(7000);

  const value = useMemo(() => ({
    toastMessage,
    toastDuration,
    setToastMessage,
    setToastDuration,
  }), [toastDuration, toastMessage]);

  // Rendu du composant, à encapsuler à un niveau suffisamment général pour que tous
  // les composants visés y aient accès.
  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
