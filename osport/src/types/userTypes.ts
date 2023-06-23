// Typage des données utilisateurs

// Sports favoris
export interface FavoriteSport {
  id: string;
  name: string;
}

// Données publiques
export interface UserPublicData {
  id: string;
  userName: string;
  dateOfBirth: string;
  gender: string;
  region: string,
  city: string;
  createdAt: string;
  isAdmin: boolean;
  description: string;
  favoriteSports: FavoriteSport[];
}

// Données privées
export interface UserPrivateData {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  street: string;
}
