export const sportNameConvert = (name: string) => {
  // Supprimer les accents
  const noAccentName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Diviser la chaîne en mots
  const words = noAccentName.split(/-| /g);
  // Convertir chaque mot en PascalCase et les combiner
  const pascalCaseName = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');

  return pascalCaseName;
};

export default sportNameConvert;
