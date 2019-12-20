const throttle = (func, delay) => {
  let timeout = null;

  return (...args) => {
    if (timeout) return;
    timeout = setTimeout(() => {
      func.call(this, ...args);
      clearTimeout(timeout);
      timeout = null;
    }, delay);
  };
};

const debounce = (func, delay) => {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, ...args);
    }, delay);
  };
};

export { throttle, debounce };
