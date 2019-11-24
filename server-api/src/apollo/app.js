const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { verifyToken } = require('../utils/token');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: verifyToken(req.headers['x-auth-token']),
  }),
});

module.exports = apolloServer;
