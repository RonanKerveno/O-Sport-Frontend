import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, error, isLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // si l'utilisateur est déjà connecté, redirige vers la page d'accueil
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <form onSubmit={handleLogin} className="border flex flex-col m-4">
        <label htmlFor="EmailInput" className="m-2">
          Email
          <input
            type="text"
            id="EmailInput"
            name="Email"
            className="border w-44 m-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="PasswordInput" className="m-2">
          Mot de passe (3 caractères minimum)
          <input
            type="password"
            id="PasswordInput"
            name="password"
            minLength={5}
            required
            className="border w-44 m-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="text-center border w-20 m-4">
          Connexion
        </button>

        {/* Affichage de l'erreur en cas d'échec de la connexion */}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
