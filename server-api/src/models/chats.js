const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('chats', ChatSchema);
