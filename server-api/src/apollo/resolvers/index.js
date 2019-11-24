/* eslint-disable global-require */
const { merge } = require('../../utils/object');

const resolvers = merge({
  Query: {},
  Mutation: {},
}, ...[
  require('./common'),
  require('./channels'),
  require('./chats'),
]);

module.exports = resolvers;
