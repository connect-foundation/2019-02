const { withFilter, ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');

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

  try {
    const channel = await newChannel.save();
    const payload = channel.toPayload({ master: user });

    return { status: 'ok', channel: payload };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannel = async (_, { channelId }, { user, pubsub }) => {
  try {
    const channel = await Channels.findOne({ channelId });
    const status = channel ? 'ok' : 'not_exist';
    const isMaster = !!channel && !!user && channel.masterId === user.userId;

    if (!channel) return { status, isMaster };

    const payload = channel.toPayload({ master: user });

    const publishPayload = { currentSlide: 0 };
    pubsub.publish(SLIDE_CHANGED, { channelId, slideChanged: publishPayload });

    return {
      status,
      isMaster,
      channel: payload,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const setCurrentSlide = async (_, { channelId, currentSlide }, { pubsub }) => {
  try {
    const channel = await Channels.findOneAndUpdate(
      { channelId },
      { currentSlide },
      { new: true },
    );
    const payload = { channelId, currentSlide: channel.currentSlide };

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
