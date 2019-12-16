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
      listenerList,
    }) => {
      const user = token ? verifyToken(token) : null;

      const context = {
        user,
        channelId,
        isMaster,
        listenerList,
        pubsub,
      };
      if (!channelId) return;

      /* Hotfix: 추후 코드 리팩토링 */
      const isExistListenerList = () => listenerList.includes(user.userId);
      if (!isExistListenerList()) {
        listenerList.push(user.userId);
        const channelListenerList = await Channels.findOneAndUpdate(
          { channelId },
          { listenerList },
        );
        const payload = await channelListenerList.toPayload({});
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
      console.log(context);
      const {
        user,
        channelId,
        isMaster,
      } = context;


      /* Hotfix: 추후 코드 리팩토링 */
      const isExistListenerList = () => context.listenerList.includes(user.userId);

      if (isExistListenerList()) {
        const listenerList = context.listenerList.filter((value) => value !== user.userId);
        const channelListenerList = await Channels.findOneAndUpdate(
          { channelId },
          { listenerList },
        );
        const payload = await channelListenerList.toPayload({});
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
