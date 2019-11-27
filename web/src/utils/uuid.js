import shortUuid from 'short-uuid';

const createShortUuid = () => shortUuid.generate();
const sliceShortUuid = (length) => {
  const targetShortUuid = shortUuid.generate();
  return targetShortUuid.substring(0, length);
};

export {
  createShortUuid,
  sliceShortUuid,
};
