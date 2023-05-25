export interface FavoriteSport {
  id: string;
  name: string;
}

export interface UserPublicData {
  id: string;
  userName: string;
  dateOfBirth: Date;
  gender: string;
  city: string;
  createdAt: string;
  isAdmin: boolean;
  description: string;
  favoriteSports: FavoriteSport[];
}

export interface UserPrivateData {
  email: string;
  lastName: string;
  firstName: string;
  zipCode: number;
  street: string;
}
