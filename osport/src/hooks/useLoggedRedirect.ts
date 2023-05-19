import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const useLoggedRedirect = () => {
  const router = useRouter();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);
};

export default useLoggedRedirect;
