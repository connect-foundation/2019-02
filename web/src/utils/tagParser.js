const tagParser = (token, limit) => {
  const nextPage = +token.split('#')[1];
  const isExist = !!nextPage && nextPage <= limit;

  return { nextPage, isExist };
};

export default tagParser;
