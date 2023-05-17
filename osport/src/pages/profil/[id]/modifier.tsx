import Head from 'next/head';
import { useRouter } from 'next/router';
import { HiUserCircle } from 'react-icons/hi2';
import { useState } from 'react';
import Footer from '../../../components/footer';

export default function ModifierProfil({ id }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nouvellesDonnees, setNouvellesDonnees] = useState({
    nom: '',
    email: '',
    photoProfil: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNouvellesDonnees((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    setNouvellesDonnees((prevState) => ({
      ...prevState,
      photoProfil: photo,
    }));
  };

  const handleModifierClick = () => {
    setIsEditMode(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Appeler la fonction de modification de profil avec les nouvelles données
    modifierProfil(nouvellesDonnees);
    setIsEditMode(false); // Sortir du mode édition après la soumission
  };

  const modifierProfil = (nouvellesDonnees) => {
    // Effectuer les vérifications et les validations des nouvelles données
    // Mettre à jour les informations du profil avec les nouvelles données
    // Gérer les erreurs et renvoyer les messages appropriés
  };

  return (
    <>
      <Head>
        <title>Modification utilisateur {id} - osport</title>
      </Head>
      <h1>Modification utilisateur {id}</h1>
      <div>
        <div className="border-t-2 border-b-2 text-center">
          <h1>Mon profil</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {isEditMode ? (
              <>
                <label htmlFor="avatar">
                  <img src="photo-actuelle.jpg" alt="Photo de profil actuelle" />
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={handlePhotoChange}
                />
              </>
            ) : (
              <img src="photo-actuelle.jpg" alt="Photo de profil actuelle" />
            )}
          </div>
          <div>
            <label htmlFor="nom">Nom :</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={nouvellesDonnees.nom}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={nouvellesDonnees.email}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="border text-center">
          {isEditMode ? (
            <button type="submit">Enregistrer les modifications</button>
          ) : (
            <button onClick={handleModifierClick}>Modifier la photo de profil</button>
          )}
          <div />
        </div>
      </div>
      <Footer />
    </>
  );
}
