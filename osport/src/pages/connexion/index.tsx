// Page de connexion

import { useToast } from '@/contexts/ToastContext';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useLoggedRedirect from '../../hooks/useLoggedRedirect';

export default function Login() {
  const { login, error, isLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hook personnalisé de redirection vers l'accueil des utilisateurs déjà connectés
  useLoggedRedirect();

  // Lancement de la requête de login via le Context d'authentification.
  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await login(email, password);
  };

  // Gestion des messages toaster

  // State gérant les paramètres du toaster.
  const { setToastMessage, toastMessage, toastDuration } = useToast();

  // useEffect gérant les actions d'affichage des messages toaster.
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
      // Réinitialisation du message après l'affichage du toast
      setToastMessage('');
    }
  }, [toastMessage, setToastMessage]);

  // Si l'utilisateur est déjà connecté on lui indique un message. Utile en complément
  // de la redirection car la page apparait juste avant la redirection.
  if (isLogged) {
    return (
      <section>
        <h1 className="text-green-700 font-bold text-xl">Vous êtes connectés !</h1>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <section>
        <div className="bg-slate-300 shadow-md mb-10 rounded-md">
          <form onSubmit={handleLogin} className="flex flex-col items-center p-7">
            <label htmlFor="loginEmail" className="p-3 rounded-md border border-gray-400">
              <div>Email</div>
              <input
                type="text"
                autoComplete="username"
                id="loginEmail"
                name="loginEmail"
                className="rounded-md m-2 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="loginPassword" className="m-2 p-3 rounded-md border border-gray-400">
              <div>Mot de passe</div>
              <input
                type="password"
                autoComplete="current-password"
                id="loginPassword"
                name="loginPassword"
                minLength={3}
                required
                className="rounded-md m-2 px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit" className="mt-6 text-white font-medium text-center bg-[#264b81] hover:bg-slate-600 transition-colors duration-1000 py-2 px-3 rounded-md">
                Connexion
              </button>
            </div>

            {/* Affichage de l'erreur en cas d'échec de la connexion */}
            {error && <p className="text-red-700 mt-4">{error}</p>}
          </form>
        </div>
        <div className="bg-slate-200 shadow-md my-4 rounded-md text-center">
          <div className="p-5 rounded-md border border-gray-200">
            <p className="mb-3 text-orange-900 font-bold">Pas encore parmis nous ?</p>
            <button
              type="button"
              className="mt-4 text-white font-medium text-center bg-green-700 hover:bg-green-900 transition-colors duration-1000 py-2 px-3 rounded-md"
              onClick={() => router.push('/inscription')}
            >
              Inscription
            </button>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={toastDuration} />
    </>
  );
}
