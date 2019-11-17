const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const auth = require('./auth');
const { verifyToken } = require('./utils/token');

class App {
  constructor(db) {
    this.app = express();
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        user: verifyToken(req.headers['x-auth-token']),
      }),
    });
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
    this.app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${this.server.graphqlPath}`);
    });
  }

  setRouting() {
    this.app.use('/auth', auth);
  }
}

module.exports = App;
