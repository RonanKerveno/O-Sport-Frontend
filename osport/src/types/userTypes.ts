export interface FavoriteSport {
  id: string;
  name: string;
}

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

export interface UserPrivateData {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  street: string;
}
