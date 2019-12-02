/* eslint-disable global-require */
const { merge } = require('../../utils/object');

const resolvers = merge({
  Query: {},
  Mutation: {},
  Subscription: {},
}, ...[
  require('./common'),
  require('./channels'),
  require('./chats'),
  require('./histories'),
]);

module.exports = resolvers;
