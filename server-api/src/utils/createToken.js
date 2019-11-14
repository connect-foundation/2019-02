const jwt = require('jsonwebtoken');

const createToken = (auth) => jwt.sign({
  id: auth.id,
  displayname: auth.displayname,
}, process.env.TOKEN_SECRET,
{
  expiresIn: '10h',
});

module.exports = createToken;
