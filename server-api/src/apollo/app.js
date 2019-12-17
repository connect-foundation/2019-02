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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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

      const context = {
        user,
        channelId,
        isMaster,
        pubsub,
      };
      /* Hotfix: 추후 코드 리팩토링 */
      if (!channelId) return;
      const { listenerList } = await Channels.findOne({ channelId });
      const isExistListenerList = () => listenerList.includes(user.userId);
      if (!isExistListenerList()) {
        listenerList.push(user.userId);
        const channelListenerList = await Channels.findOneAndUpdate(
          { channelId },
          { listenerList },
        );
        const payload = await channelListenerList.toPayload('channel', { channelId, listenerList });
        pubsub.publish('LISTENER_LIST_CHANGED', { listenerListChanged: payload });
      }
      if (!isMaster) return context;

      const channel = await Channels.findAndUpdateStatus(channelId, user.userId, 'on');
      pubsub.publish('CHANNEL_STATUS_CHANGED', { channelStatusChanged: channel });

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

      /* Hotfix: 추후 코드 리팩토링 */
      const channelInfomation = await Channels.findOne({ channelId });
      if (channelInfomation.listenerList === null) return;
      const isExistListenerList = () => channelInfomation.listenerList.includes(user.userId);
      if (isExistListenerList()) {
        const listenerList = channelInfomation.listenerList
          .filter((value) => value !== user.userId);
        const channelListenerList = await Channels.findOneAndUpdate(
          { channelId },
          { listenerList },
        );
        const payload = await channelListenerList.toPayload('channel', { channelId, listenerList });
        pubsub.publish('LISTENER_LIST_CHANGED', { listenerListChanged: payload });
      }
      if (!isMaster) return context;

      const channel = await Channels.findAndUpdateStatus(channelId, user.userId, 'off');
      context.pubsub.publish('CHANNEL_STATUS_CHANGED', { channelStatusChanged: channel });

      return context;
    },
  },
});

module.exports = apolloServer;
