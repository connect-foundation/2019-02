const http = require('http');
const mongoose = require('mongoose');
const expressApp = require('./express/app');
const apolloApp = require('./apollo/app');

const start = () => {
  const httpServer = http.createServer(expressApp);
  const authServer = expressApp;
  const apiServer = apolloApp;
  const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  const doneDbConnection = (error) => {
    if (error) console.error('mongodb connect error', error);
    else console.log('mongodb connect success!');
  };
  const doneServerStart = () => {
    console.log([
      '🚀 Server ready at ',
      `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      apiServer.graphqlPath,
    ].join(''));
  };

  mongoose.connect(process.env.DB_URL, connectOptions, doneDbConnection);
  mongoose.set('useFindAndModify', false);
  apiServer.applyMiddleware({ app: authServer });
  apiServer.installSubscriptionHandlers(httpServer);
  httpServer.listen({ port: process.env.SERVER_PORT }, doneServerStart);
};

module.exports = {
  start,
};
