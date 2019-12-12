const mongoose = require('mongoose');
const { assignFilter } = require('../utils/object');

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
  isQuestion: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ChatSchema.methods.toPayload = function toChatPayload(...objs) {
  const chat = this;
  const author = {
    userId: chat.userId,
    displayName: chat.displayName,
  };

  return assignFilter([
    'id',
    'channelId',
    'author',
    'message',
    'likes',
    'isQuestion',
    'createdAt',
  ], chat, { author }, ...objs);
};

module.exports = mongoose.model('chats', ChatSchema);
