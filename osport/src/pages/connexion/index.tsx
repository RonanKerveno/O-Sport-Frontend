import Head from 'next/head';

export default function Login() {
  return (
    <div>
      <Head>
        <title>Connexion - osport</title>
      </Head>
      <div className="border flex flex-col m-4">
        <label htmlFor="Email" className="m-2">Email</label>
        <input type="text" id="Email" name="Email" className="border w-44 m-2" />
      </div>

      <div className="border flex flex-col m-4">
        <label htmlFor="pass" className="m-2">Password (8 characters minimum):</label>
        <input
          type="password"
          id="pass"
          name="password"
          minLength="8"
          required
          className="border w-44 m-2"
        />
      </div>

      <div className="text-center border w-20 m-4"><button type="button" aria-label="Submit" className="hover:bg-gray-50"><input type="submit" value="Sign in" /></button></div>
    </div>

  );
}
