const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  masterId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  maxHeadCount: {
    type: Number,
    required: true,
    default: 100,
  },
  expiredAt: {
    type: Date,
    required: true,
    default: Date.now() + 30 * 24 * 60 * 60 * 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('channels', ChannelSchema);
