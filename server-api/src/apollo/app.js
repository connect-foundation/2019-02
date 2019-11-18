const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { verifyToken } = require('../utils/token');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: verifyToken(req.headers['x-auth-token']),
  }),
});

module.exports = apolloServer;
