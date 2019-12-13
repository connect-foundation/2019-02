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

ChannelSchema.statics.updateChannelOptions = async function updateChannelOptions(
  channelId,
  userId,
  channelOptions,
) {
  const ChannelModel = this;
  const channel = await ChannelModel.findOne({ channelId });

  if (!channel) return null;
  if (channel.masterId !== userId) return null;

  Object.keys(channelOptions).forEach((key) => {
    channel[key] = channelOptions[key];
  });

  await channel.save();

  return channel;
};

ChannelSchema.methods.toPayload = async function toChannelPayload(type, ...objs) {
  const channel = this;
  const master = await Users.findOne({ userId: channel.masterId });

  const data = assignFilter([
    'id',
    'channelId',
    'master',
    'slideUrls',
    'slideRatioList',
    'fileUrl',
    'channelStatus',
    'currentSlide',
    'channelCode',
  ], channel, { master }, ...objs);

  const channelOptions = assignFilter([
    'id',
    'channelName',
    'maxHeadCount',
    'expiredAt',
    'anonymousChat',
    'emojiEffect',
  ], channel, { master }, ...objs);

  if (type === 'channelOptions') return { ...channelOptions };
  return { ...data, channelOptions };
};

module.exports = mongoose.model('channels', ChannelSchema);
