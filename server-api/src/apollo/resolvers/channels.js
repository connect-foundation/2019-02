const { ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');

const createChannelInfo = (user, channelId) => ({
  channelId,
  channelName: `${user.displayName}님의 채널입니다.😀`,
});

const createChannel = async (_, { channelId }, { user }) => {
  const newChannel = new Channels(createChannelInfo(user, channelId));

  try {
    const result = await newChannel.save();
    return { status: 'ok', channel: result };
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
