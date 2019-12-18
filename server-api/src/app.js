const http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const expressApp = require('./express/app');
const apolloApp = require('./apollo/app');

const isProdEnv = process.env.NODE_ENV === 'production';
const ORIGIN = `${isProdEnv ? 'https' : 'http'}://${process.env.HOST}:${process.env.PORT}`;
const server = isProdEnv
  ? https.createServer({
    key: fs.readFileSync(`${process.env.PEM_PATH}/key.pem`),
    cert: fs.readFileSync(`${process.env.PEM_PATH}/cert.pem`),
    ca: fs.readFileSync(`${process.env.PEM_PATH}/chain.pem`),
  }, expressApp)
  : http.createServer(expressApp);
const dbConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  poolSize: 50,
};
const handleDbConnect = (error) => {
  if (error) console.error('mongodb connect error', error);
  else console.log('mongodb connect success!');
};
const handleServerStart = () => {
  console.log(`Dropy Api starts on ${ORIGIN}${apolloApp.graphqlPath}`);
  console.log(`Dropy Ws starts on ${ORIGIN}${apolloApp.subscriptionsPath}`);
};

const start = () => {
  mongoose.connect(process.env.DB_URL, dbConnectOptions, handleDbConnect);
  mongoose.set('useFindAndModify', false);
  apolloApp.applyMiddleware({ app: expressApp });
  apolloApp.installSubscriptionHandlers(server);
  server.listen({ port: process.env.PORT }, handleServerStart);
};

module.exports = { start };
