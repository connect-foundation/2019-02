const {
  ApolloServer,
  makeExecutableSchema,
  PubSub,
} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
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
    onConnect: (connectionParams) => Promise.resolve(connectionParams['x-auth-token'])
      .then((token) => ({
        user: token ? verifyToken(token) : null,
        pubsub,
      })),
    onDisconnect: () => {
      console.log('out!!!!!!!!!!!!🤭작동하는군요!');
    },
  },
});

module.exports = apolloServer;
