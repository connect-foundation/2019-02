const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
  },
  displayname: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.statics.upsert = function upsertUser(username, displayname) {
  const UserModel = this;
  const findUser = UserModel.findOne({ username });

  return findUser.then((user) => {
    if (user) return user;

    const userInfo = {
      username,
      displayname,
    };
    const newUser = new UserModel(userInfo);

    return newUser.save();
  }).catch((error) => {
    throw error;
  });
};

module.exports = mongoose.model('user', UserSchema);
