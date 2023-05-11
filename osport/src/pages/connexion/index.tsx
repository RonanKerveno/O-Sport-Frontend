import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { isLogged, login, logout } = useAuth();

  return (
    <>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <h1>Connexion</h1>
      <div>
        <h1>Hello Context</h1>
        <h2>User: {isLogged ? 'login' : 'logout'}</h2>
        <div>
          <button onClick={login} type="button">Login</button>
        </div>
        <div>
          <button onClick={logout} type="button">Logout</button>
        </div>
      </div>
    </>

  );
}
