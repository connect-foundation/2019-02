const mongoose = require('mongoose');
const Users = require('./users');
const { assignFilter } = require('../utils/object');

const { Schema } = mongoose;
const expired = 30 * 24 * 60 * 60 * 1000;

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
    default: Date.now() + expired,
  },
  slideUrls: {
    type: Array,
  },
  slideRatioList: {
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
  anonymousChat: {
    type: Boolean,
    default: true,
  },
  emojiEffect: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ChannelSchema.statics.updateChannelOption = async function updateChannelOption(
  channelId,
  userId,
  option,
  optionValue,
) {
  const ChannelModel = this;
  const channel = await ChannelModel.findOne({ channelId });

  if (!channel) return null;
  if (channel.masterId !== userId) return null;

  channel[option] = optionValue;
  await channel.save();

  return channel;
};

ChannelSchema.methods.toPayload = async function toChannelPayload(...objs) {
  const channel = this;
  const master = await Users.findOne({ userId: channel.masterId });

  return assignFilter([
    'channelId',
    'master',
    'channelName',
    'maxHeadCount',
    'expiredAt',
    'slideUrls',
    'slideRatioList',
    'fileUrl',
    'channelStatus',
    'currentSlide',
    'channelCode',
    'anonymousChat',
    'emojiEffect',
  ], channel, { master }, ...objs);
};

module.exports = mongoose.model('channels', ChannelSchema);
