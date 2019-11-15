const jwt = require('jsonwebtoken');

const createToken = (auth) => jwt.sign({
  id: auth.id,
  displayname: auth.displayname,
}, process.env.TOKEN_SECRET,
{
  expiresIn: '10h',
});

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
