const movePagePossible = (direction, current, length) => (!((direction === 'back' && current === 0)
|| (direction === 'foward' && current === length - 1)));

export default movePagePossible;
