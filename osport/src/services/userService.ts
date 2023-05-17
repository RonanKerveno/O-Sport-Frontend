import axios from 'axios';

export default async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post('http://localhost:5500/users/login', {
      email,
      password,
    });

    // Extraire le token de la réponse
    const { token } = response.data;

    return {
      success: true,
      token,
    };
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur', error);
    return {
      success: false,
    };
  }
}
