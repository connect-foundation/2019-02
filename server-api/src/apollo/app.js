const {
  ApolloServer,
  makeExecutableSchema,
  PubSub,
} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { enteredListener, leaveListener } = require('./webSocket/webSocket');
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
    }) => enteredListener({
      token,
      channelId,
      isMaster,
      pubsub,
    }),
    onDisconnect: async (_, { initPromise }) => leaveListener({ initPromise }, pubsub),
  },
});

module.exports = apolloServer;
