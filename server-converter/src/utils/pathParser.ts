export const getExtenstion = (path: string): string => {
  const indexOfPoint = path.lastIndexOf('.');

  return path.substring(indexOfPoint + 1);
};

export const getFilename = (path: string): string => {
  const indexOfPoint = path.lastIndexOf('.');
  let indexOfSep = path.lastIndexOf('/');

  indexOfSep = indexOfSep !== -1 ? 0 : indexOfSep;

  return path.substring(indexOfSep + 1, indexOfPoint);
};
