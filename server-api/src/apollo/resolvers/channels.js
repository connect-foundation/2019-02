const Channels = require('../../models/channels');

const createChannelInfo = (user, channelId) => ({
  channelId,
  channelName: `${user.displayname}님의 채널입니다.😀`,
});

const createChannel = async (_, { channelId }, { user }) => {
  const newChannel = new Channels(createChannelInfo(user, channelId));

  try {
    const result = await newChannel.save();
    return { status: 'ok', channel: result }
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  Mutation: {
    createChannel,
  },
};

module.exports = resolvers;
