const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');
const passport = require('passport');
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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.setSession();
    this.setRouting();
    this.server.applyMiddleware({ app: this.app });
  }

  start() {
    this.app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`);
    });
  }

  setSession() {
    const MongoStore = connectMongo(session);
    const sessionMiddleWare = session({
      key: 'sid',
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 24 * 1000 * 60 * 60,
      },
      store: new MongoStore({
        mongooseConnection: this.db.connection,
        ttl: 24 * 60 * 60,
      }),
    });

    this.app.use(sessionMiddleWare);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  setRouting() {
    this.app.use('/auth', auth);
  }
}

module.exports = App;
