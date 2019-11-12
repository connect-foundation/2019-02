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

module.exports = mongoose.model('user', UserSchema);
