const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

class App {
  constructor() {
    this.app = express();
    this.server = new ApolloServer({ typeDefs, resolvers });
  }
  init() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.server.applyMiddleware({ app: this.app });
  }
  start() {
    this.app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`)
    );
  }
}

module.exports = new App();