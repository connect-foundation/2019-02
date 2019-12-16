const uuid = require('uuid/v1');
const { createToken } = require('../../utils/token');

const setAuth = (req, res, next) => {
  if (!req.user) return res.send(401, 'User Not Authenticated');

  req.auth = {
    userId: req.user.userId,
    displayName: req.user.displayName,
    isAnonymous: false,
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

const setAnonymousAuth = (req, _, next) => {
  req.auth = {
    userId: `anonymous_${uuid()}`,
    displayName: '익명',
    isAnonymous: true,
  };

  next();
};

const sendAnonymousToken = (req, res) => {
  res.setHeader('x-anonymous-token', req.token);

  return res.status(200).json({
    userId: req.auth.userId,
    displayName: req.auth.displayName,
  });
};

module.exports = {
  setAuth,
  generateToken,
  sendToken,
  setAnonymousAuth,
  sendAnonymousToken,
};
