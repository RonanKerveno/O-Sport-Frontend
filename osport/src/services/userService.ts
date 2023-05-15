import axios from 'axios';

export default async function getUser(id: number) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}

// Autres requêtes API liées à l'utilisateur...
