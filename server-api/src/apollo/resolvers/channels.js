const { withFilter, ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const Histories = require('../../models/histories');
const Users = require('../../models/users');

const SLIDE_CHANGED = 'SLIDE_CHANGED';

const createChannelInfo = (
  user,
  channelId,
  slideUrls,
  fileUrl,
) => ({
  channelId,
  channelName: `${user.displayName}님의 채널입니다.😀`,
  masterId: user.userId,
  slideUrls,
  fileUrl,
});

const createChannel = async (_, {
  channelId,
  slideUrls,
  fileUrl,
}, { user }) => {
  const newChannel = new Channels(
    createChannelInfo(
      user,
      channelId,
      slideUrls,
      fileUrl,
    ),
  );
  const updatedAt = Date.now();
  const { userId } = user;
  const masterId = userId;
  const newHistory = new Histories({
    userId,
    masterId,
    channelId,
    updatedAt,
  });

  try {
    const channel = await newChannel.save();
    const payload = channel.toPayload({ master: user });

    return { status: 'ok', channel: payload };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannel = async (_, { channelId }, { user }) => {
  try {
    const channel = await Channels.findOne({ channelId });
    const master = await Users.findOne({ userId: channel.masterId });
    const status = channel ? 'ok' : 'not_exist';
    const isMaster = !!channel && !!user && channel.masterId === user.userId;

    if (!channel) return { status, isMaster };

    const payload = channel.toPayload({ master });

    return {
      status,
      isMaster,
      channel: payload,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const setCurrentSlide = async (_, { channelId, currentSlide }, { user, pubsub }) => {
  try {
    const channel = await Channels.findOneAndUpdate(
      { channelId },
      { currentSlide },
      { new: true },
    );
    const payload = channel.toPayload({ master: user });

    pubsub.publish(SLIDE_CHANGED, { slideChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const slideChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(SLIDE_CHANGED),
    (payload, variables) => payload.slideChanged.channelId === variables.channelId,
  ),
};

const resolvers = {
  Query: {
    getChannel,
  },
  Mutation: {
    createChannel,
    setCurrentSlide,
  },
  Subscription: {
    slideChanged,
  },
};

module.exports = resolvers;
