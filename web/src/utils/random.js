const getRandomItemOfList = (targetList) => {
  const listLength = targetList.length;
  const randomIndex = Math.floor(Math.random() * listLength);

  return targetList[randomIndex];
};

export default getRandomItemOfList;
