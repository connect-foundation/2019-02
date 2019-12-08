const endMiddleware = (req, res, next) => {
  if (!res.endhandler) {
    res.endhandler = res.end;
    res.end = (...args) => {
      res.end = res.endhandler;
      res.emit('end');
      res.end(...args);
    };
  } else {
    throw new Error('function is already overridden');
  }

  next();
};

export default endMiddleware;
