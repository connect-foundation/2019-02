const mongoose = require('mongoose');
const Users = require('./users');
const { assignFilter } = require('../utils/object');

const { Schema } = mongoose;

const ChannelSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  channelCode: {
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
  slideUrls: {
    type: Array,
  },
  fileUrl: {
    type: String,
  },
  channelStatus: {
    type: String,
    required: true,
    default: 'on',
  },
  currentSlide: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ChannelSchema.methods.toPayload = async function toChannelPayload(...objs) {
  const channel = this;
  const master = await Users.findOne({ userId: channel.masterId });

  return assignFilter([
    'channelId',
    'master',
    'channelName',
    'maxHeadCount',
    'slideUrls',
    'fileUrl',
    'channelStatus',
    'currentSlide',
    'channelCode',
  ], channel, { master }, ...objs);
};

module.exports = mongoose.model('channels', ChannelSchema);
