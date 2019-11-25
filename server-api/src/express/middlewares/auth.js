const { createToken } = require('../../utils/token');

const setAuth = (req, res, next) => {
  if (!req.user) return res.send(401, 'User Not Authenticated');

  req.auth = {
    id: req.user.id,
    displayName: req.user.displayName,
  };

  next();
};

const generateToken = (req, _, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).json(req.user);
};

module.exports = {
  setAuth,
  generateToken,
  sendToken,
};
