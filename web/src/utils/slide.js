const moveSlidePossible = (direction, current, length) => (!((direction === 'back' && current === 0)
|| (direction === 'foward' && current === length - 1)));

const moveSlide = (direction, cb, page) => {
  if (direction === 'back') cb(page - 1);
  else cb(page + 1);
};

export { moveSlide, moveSlidePossible };
