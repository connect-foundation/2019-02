const jwt = require('jsonwebtoken');

/**
 * @param {{ id: string, displayname: string }} auth
 * @returns {string} jwt token
 */
const createToken = (auth) => jwt.sign({
  id: auth.id,
  displayname: auth.displayname,
}, process.env.TOKEN_SECRET);

/**
 * @param {string} token
 * @returns {{ id: string, displayname: string }}
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
