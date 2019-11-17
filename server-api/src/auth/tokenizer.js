const { createToken } = require('../utils/token');

const generateToken = (req, _, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).json(req.user);
};

module.exports = {
  generateToken,
  sendToken,
};
