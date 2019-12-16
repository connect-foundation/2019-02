
const { withFilter, ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const Histories = require('../../models/histories');
const Users = require('../../models/users');

const SLIDE_CHANGED = 'SLIDE_CHANGED';
const CHANNEL_STATUS_CHANGED = 'CHANNEL_STATUS_CHANGED';
const OPTION_CHANGED = 'OPTION_CHANGED';
const LISTENER_LIST_CHANGED = 'LISTENER_LIST_CHANGED';

const createChannelInfo = (
  user,
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
  slideRatioList,
) => ({
  channelId,
  channelCode,
  channelName: `${user.displayName}님의 채널입니다😀`,
  masterId: user.userId,
  slideUrls,
  fileUrl,
  slideRatioList,
});

const createChannel = async (_, {
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
  slideRatioList,
}, { user }) => {
  const newChannel = new Channels(
    createChannelInfo(
      user,
      channelId,
      channelCode,
      slideUrls,
      fileUrl,
      slideRatioList,
    ),
  );

  const { userId } = user;
  const masterId = userId;
  const updatedAt = Date.now();
  const newHistory = new Histories({
    userId,
    masterId,
    channelId,
    updatedAt,
  });

  try {
    const channel = await newChannel.save();
    const payload = await channel.toPayload('channel', { id: channelId, master: user });

    await newHistory.save();

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannel = async (_, { channelId }, { user }) => {
  const response = {
    status: 'fail',
    isMaster: false,
    channel: null,
  };

  if (!user) return response;

  try {
    const channel = await Channels.findOne({ channelId });

    if (!channel) return response;

    const master = await Users.findOne({ userId: channel.masterId });
    const status = channel ? 'ok' : 'not_exist';
    const isMaster = !!channel && !!user && channel.masterId === user.userId;
    const payload = await channel.toPayload('channel', { id: channelId, master });

    return {
      status,
      isMaster,
      channel: payload,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannelsByCode = async (_, { channelCode }) => {
  try {
    const channels = await Channels.find({ channelCode });
    const status = channels ? 'ok' : 'not_exist';
    const refindedChannels = channels.map(async (channel) => {
      const master = await Users.findOne({ userId: channel.masterId });
      return channel.toPayload('channel', { id: channel.channelId, master });
    });

    return {
      status,
      channels: refindedChannels,
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
    const payload = await channel.toPayload('channel', { id: channelId, master: user });

    pubsub.publish(SLIDE_CHANGED, { slideChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const setChannelStatus = async (_, { channelId, status }, { user, pubsub }) => {
  const channel = await Channels.findAndUpdateStatus(channelId, user.userId, status);
  const payload = channel;

  pubsub.publish(CHANNEL_STATUS_CHANGED, { channelStatusChanged: payload });

  return payload;
};

const updateChannelOptions = async (_, { channelId, channelOptions }, { user, pubsub }) => {
  try {
    const channel = await Channels.updateChannelOptions(channelId, user.userId, channelOptions);
    const payload = await channel.toPayload('channelOptions', { id: channelId });

    pubsub.publish(OPTION_CHANGED, { optionChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const listenerListChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(LISTENER_LIST_CHANGED),
    (payload, variables) => payload.listenerListChanged.channelId === variables.channelId,
  ),
};

const slideChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(SLIDE_CHANGED),
    (payload, variables) => payload.slideChanged.channelId === variables.channelId,
  ),
};

const channelStatusChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(CHANNEL_STATUS_CHANGED),
    (payload, variables) => payload.channelStatusChanged.channelId === variables.channelId,
  ),
};

const optionChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(OPTION_CHANGED),
    (payload, variables) => payload.optionChanged.id === variables.channelId,
  ),
};


const resolvers = {
  Query: {
    getChannel,
    getChannelsByCode,
  },
  Mutation: {
    createChannel,
    setCurrentSlide,
    setChannelStatus,
    updateChannelOptions,
  },
  Subscription: {
    slideChanged,
    channelStatusChanged,
    optionChanged,
    listenerListChanged,
  },
};

module.exports = resolvers;
