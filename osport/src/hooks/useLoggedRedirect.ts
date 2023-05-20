// Hook personnalisé pour rédirigé vers la page d'accueil les utilisateurs déjà loggués.
// Utile pour de ne plus accéder à certaines pages comme la connexion ou l'inscription.

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const useLoggedRedirect = () => {
  const router = useRouter();
  const { isLogged } = useAuth();

  // On se sert de l'état isLogged du Context d'Authentification. Si true on redirige.
  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);
};

export default useLoggedRedirect;
