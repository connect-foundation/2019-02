const jwt = require('jsonwebtoken');

/**
 * @param {{ userId: string, displayName: string }} auth
 * @returns {string} jwt token
 */
const createToken = (auth) => jwt.sign(auth, process.env.TOKEN_SECRET);

/**
 * @param {string} token
 * @returns {{ userId: string, displayName: string }}
 */
const verifyToken = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
