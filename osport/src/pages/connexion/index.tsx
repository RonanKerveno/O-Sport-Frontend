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
    <>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <div className="flex flex-col flex-wrap bg-slate-100 justify-center items-center">
        <div className="flex bg-white shadow-md m-4 rounded-md p-4">
          <form onSubmit={handleLogin} className="flex flex-col">
            <label htmlFor="EmailInput" className="m-2 p-1 pl-2 border rounded-md border-gray-400">
              Email :
              <input
                type="text"
                id="EmailInput"
                name="Email"
                className="border w-44 m-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="PasswordInput" className="m-2 p-1 pl-2 border rounded-md border-gray-400">
              Mot de passe (3 caractères minimum) :
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
            <div className="w-full text-center">
              <button type="submit" className="text-center border p-2  rounded-md hover:bg-blue-600 hover:text-[#f9fafb] ">
                Connexion
              </button>
            </div>

            {/* Affichage de l'erreur en cas d'échec de la connexion */}
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
