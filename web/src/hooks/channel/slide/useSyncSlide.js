const useSyncSlide = ({
  isMaster,
  isSync,
  page,
  currentSlide,
}) => {
  if (isMaster) return page;
  if (!isMaster && isSync) return currentSlide;
  return page;
};

export default useSyncSlide;
