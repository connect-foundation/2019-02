const { withFilter } = require('apollo-server-express');

const START_FLYING_EMOJI = 'START_FLYING_EMOJI';

const broadcastEmoji = (_, {
  channelId,
  type,
}, { pubsub }) => {
  const payload = {
    channelId,
    type,
  };

  pubsub.publish(START_FLYING_EMOJI, { startFlyingEmoji: payload });

  return payload;
};

const startFlyingEmoji = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(START_FLYING_EMOJI),
    (payload, variables) => payload.startFlyingEmoji.channelId === variables.channelId,
  ),
};

const resolvers = {
  Mutation: {
    broadcastEmoji,
  },
  Subscription: {
    startFlyingEmoji,
  },
};

module.exports = resolvers;
