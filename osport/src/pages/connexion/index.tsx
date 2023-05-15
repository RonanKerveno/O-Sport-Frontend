import Head from 'next/head';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const {
    isLogged, login, logout, error,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1>Connexion</h1>
        {!isLogged ? (
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} type="button">Se connecter</button>
            {error && <p>{error}</p>}
          </div>
        ) : (
          <div>
            <h2>Bienvenue !</h2>
            <button onClick={logout} type="button">Se déconnecter</button>
          </div>
        )}
      </div>
    </>
  );
}
