const { withFilter } = require('apollo-server-express');

const START_FLYING_EMOJI = 'START_FLYING_EMOJI';

const startFlyingEmoji = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(START_FLYING_EMOJI),
    (payload, variables) => payload.startFlyingEmoji.channelId === variables.channelId,
  ),
};

const resolvers = {
  Subscription: {
    startFlyingEmoji,
  },
};

module.exports = resolvers;
