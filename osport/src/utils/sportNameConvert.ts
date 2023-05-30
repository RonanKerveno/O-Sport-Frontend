export const sportNameConvert = (name: string) => {
  // Supprimer les espaces et les tirets, et convertir en camelCase
  const pascalCaseName = name.replace(/-| /g, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase());
  return pascalCaseName;
};

export default sportNameConvert;
