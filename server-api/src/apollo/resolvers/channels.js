const { ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const { assignFilter } = require('../../utils/object');

const createChannelInfo = (user, channelId) => ({
  channelId,
  channelName: `${user.displayName}님의 채널입니다.😀`,
  masterId: user.userId,
});

const createChannel = async (_, { channelId }, { user }) => {
  const newChannel = new Channels(createChannelInfo(user, channelId));

  try {
    const result = await newChannel.save();
    const channel = assignFilter([
      'channelId',
      'master',
      'channelName',
      'maxHeadCount',
    ], result, { master: user });

    return { status: 'ok', channel };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Mutation: {
    createChannel,
  },
};

module.exports = resolvers;
