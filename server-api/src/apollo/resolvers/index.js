/* eslint-disable global-require */
const { merge } = require('../../utils/object');

const resolvers = merge({
  Query: {},
  Mutation: {},
}, ...[
  require('./common'),
  require('./channels'),
]);

module.exports = resolvers;
