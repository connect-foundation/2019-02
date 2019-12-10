const moveSlidePossible = (direction, current, length) => (!((!direction && current === 0)
|| (direction && current === length - 1)));

const moveSlide = (page, direction, callback) => {
  if (!direction) callback(page - 1);
  else callback(page + 1);
};

export { moveSlide, moveSlidePossible };
