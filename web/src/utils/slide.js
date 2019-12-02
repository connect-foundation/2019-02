const moveSlidePossible = (direction, current, length) => (!((direction === 'back' && current === 0)
|| (direction === 'foward' && current === length - 1)));

const moveSlide = (page, direction, callback) => {
  if (direction === 'back') callback(page - 1);
  else callback(page + 1);
};

export { moveSlide, moveSlidePossible };
