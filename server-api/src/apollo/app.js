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
    onConnect: async ({ token, channelId, isMaster }) => {
      const user = token ? verifyToken(token) : null;

      const context = {
        user,
        channelId,
        isMaster,
        pubsub,
      };

      if (!isMaster) return context;

      /* Hotfix: 추후 코드 리팩토링 */
      const channel = await Channels.findAndUpdateStatus(channelId, user.userId, 'on');
      pubsub.publish('CHANNEL_STATUS_CHANGED', { channelStatusChanged: channel });

      return context;
    },
    onDisconnect: async (_, { initPromise }) => {
      const context = await initPromise;
      const {
        user,
        channelId,
        isMaster,
      } = context;

      if (!isMaster) return context;

      /* Hotfix: 추후 코드 리팩토링 */
      const channel = await Channels.findAndUpdateStatus(channelId, user.userId, 'off');
      context.pubsub.publish('CHANNEL_STATUS_CHANGED', { channelStatusChanged: channel });

      return context;
    },
  },
});

module.exports = apolloServer;
