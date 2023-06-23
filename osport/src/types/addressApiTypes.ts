// Typage des données liées à l'API de recherche d'adresse.

export interface AddressApi {
  properties: {
    label: string;
    id: string;
    name: string;
    postcode: string;
    city: string;
    context: string;
  };
}
