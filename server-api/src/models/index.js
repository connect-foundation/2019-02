const mongoose = require('mongoose');
const Users = require('./users');

mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) {
      console.log('mongodb connect error', error);
    } else {
      console.log('mongodb connect success!');
    }
  },
);

module.exports = {
  Users,
  connection: mongoose.connection,
};
