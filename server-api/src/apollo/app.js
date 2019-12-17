const {
  ApolloServer,
  makeExecutableSchema,
  PubSub,
} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const Channels = require('../models/channels');
const { verifyToken } = require('../utils/token');

const pubsub = new PubSub();

const LISTENER_LIST_CHANGED = 'LISTENER_LIST_CHANGED';
const CHANNEL_STATUS_CHANGED = 'CHANNEL_STATUS_CHANGED';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const updateListenerList = async (channelId, listenerList) => {
  const channelListenerList = await Channels.findOneAndUpdate(
    { channelId },
    { listenerList },
  );

  const payload = await channelListenerList.toPayload('channel', { channelId, listenerList });
  pubsub.publish(LISTENER_LIST_CHANGED, { listenerListChanged: payload });
};

const updateChannelStatus = async (channelId, user, status) => {
  const channel = await Channels.findAndUpdateStatus(channelId, user.userId, status);
  pubsub.publish(CHANNEL_STATUS_CHANGED, { channelStatusChanged: channel });
};

const isExistListenerList = (user, listenerList) => listenerList.includes(user.userId);

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, connection }) => (connection ? connection.context : ({
    user: verifyToken(req.headers['x-auth-token']),
    pubsub,
  })),
  subscriptions: {
    onConnect: async ({
      token,
      channelId,
      isMaster,
    }) => {
      const user = token ? verifyToken(token) : null;
      if (!channelId) return;

      const context = {
        user,
        channelId,
        isMaster,
        pubsub,
      };

      const { listenerList } = await Channels.findOne({ channelId });
      if (!isExistListenerList(user, listenerList)) {
        listenerList.push(user.userId);
        updateListenerList(channelId, listenerList);
      }
      if (!isMaster) return context;

      updateChannelStatus(channelId, user, 'on');

      return context;
    },
    onDisconnect: async (_, { initPromise }) => {
      const context = await initPromise;
      if (!context) return;

      const {
        user,
        channelId,
        isMaster,
      } = context;

      const channelInfomation = await Channels.findOne({ channelId });
      if (channelInfomation.listenerList === null) return;
      if (isExistListenerList(user, channelInfomation.listenerList)) {
        const listenerList = channelInfomation.listenerList
          .filter((value) => value !== user.userId);
        updateListenerList(channelId, listenerList);
      }
      if (!isMaster) return context;

      updateChannelStatus(channelId, user, 'off');

      return context;
    },
  },
});

module.exports = apolloServer;
