const { ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const { assignFilter } = require('../../utils/object');

const createChannelInfo = (
  user,
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
) => ({
  channelId,
  channelCode,
  channelName: `${user.displayName}님의 채널입니다.😀`,
  masterId: user.userId,
  slideUrls,
  fileUrl,
});

const checkChannel = async (_, { channelId }, { user }) => {
  try {
    const channel = await Channels.findOne({ channelId });
    const {
      slideUrls,
      fileUrl,
      masterId,
    } = channel;
    const status = channel ? 'ok' : 'not_exist';
    const isMaster = !!channel && !!user && masterId === user.userId;
    return {
      status,
      isMaster,
      slideUrls,
      fileUrl,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const createChannel = async (_, {
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
}, { user }) => {
  const newChannel = new Channels(
    createChannelInfo(
      user,
      channelId,
      channelCode,
      slideUrls,
      fileUrl,
    ),
  );

  try {
    const result = await newChannel.save();
    const channel = assignFilter([
      'channelId',
      'channelCode',
      'master',
      'channelName',
      'maxHeadCount',
      'slideUrls',
      'fileUrl',
    ], result, { master: user });

    return { status: 'ok', channel };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannelsByCode = async (_, { channelCode }) => {
  try {
    const channels = await Channels.find({ channelCode });
    const status = channels ? 'ok' : 'not_exist';

    return {
      status,
      channels,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Query: {
    checkChannel,
    getChannelsByCode,
  },
  Mutation: {
    createChannel,
  },
};

module.exports = resolvers;
