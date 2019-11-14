const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const auth = require('./auth');

class App {
  constructor(db) {
    this.app = express();
    this.server = new ApolloServer({ typeDefs, resolvers });
    this.db = db;
  }

  init() {
    const corsOption = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    };
    this.app.use(cors(corsOption));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.setRouting();
    this.server.applyMiddleware({ app: this.app });
  }

  start() {
    this.app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`);
    });
  }

  setRouting() {
    this.app.use('/auth', auth);
  }
}

module.exports = App;
