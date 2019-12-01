const { ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const Histories = require('../../models/histories');


const addHistory = async (_, {
  channelId,
}, { user }) => {
  const channel = await Channels.findOne({ channelId });
  const { masterId } = channel;
  const { userId } = user;
  const updatedAt = Date.now();
  const findHistory = await Histories.find({ userId, channelId });
  const isMaster = masterId === userId;
  const firstVisitedChannel = () => !isMaster && findHistory.length === 0;

  if (!firstVisitedChannel()) return { status: 'not_exist', history: null };

  const newHistory = new Histories({
    userId,
    masterId,
    channelId,
    updatedAt,
  });

  try {
    const history = await newHistory.save();
    const payload = await history.toPayload();

    return { status: 'ok', history: payload };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getHistories = async (_, __, { user }) => {
  try {
    const histories = (await Histories.find({ userId: user.userId })) || [];
    const payloads = await Promise.all(histories.map((history) => history.toPayload()));

    return payloads;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Query: {
    getHistories,
  },
  Mutation: {
    addHistory,
  },
};

module.exports = resolvers;
