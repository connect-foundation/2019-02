const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
  },
  displayName: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.statics.upsert = function upsertUser(userId, displayName) {
  const UserModel = this;
  const findUser = UserModel.findOne({ userId });

  return findUser.then((user) => {
    if (user) return user;

    const userInfo = {
      userId,
      displayName,
    };
    const newUser = new UserModel(userInfo);

    return newUser.save();
  }).catch((error) => {
    throw error;
  });
};

module.exports = mongoose.model('user', UserSchema);
