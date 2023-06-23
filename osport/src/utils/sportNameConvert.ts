// Utilitaire pour convertir un nom de sport en PascalCase sans espaces ni accents.

export const sportNameConvert = (name: string) => {
  // Suppression des accents
  const noAccentName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Division de la chaîne selon les mots qu'elle contient.
  const words = noAccentName.split(/-| /g);
  // Conversion de chaque mot en PascalCase puis assemblage des mots en une seule châine.
  const pascalCaseName = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

  return pascalCaseName;
};

export default sportNameConvert;
