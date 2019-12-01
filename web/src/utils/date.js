const dateParser = (updatedAt) => {
  const date = new Date(updatedAt);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export default dateParser;
