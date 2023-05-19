import axios from 'axios';
import API_URL from './apiConfig';

// Récupération de la liste de tous les sports
export async function getAllSports() {
  try {
    const response = await axios.get(`${API_URL}/sports`);

    // Récupération des données
    const sportsData = response.data;

    return {
      success: true,
      sports: sportsData,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

// Récupération d'un sport ciblé par l’ID
export async function getOneSport(sportId: string) {
  try {
    const response = await axios.get(`${API_URL}/sports/${sportId}`);

    // Récupération des données
    const sportData = response.data;

    return {
      success: true,
      sport: sportData,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
