const { withFilter } = require('apollo-server-express');

const CHAT_ADDED = 'CHAT_ADDED';

const addChat = (_, { channelId, message }, { user, pubsub }) => {
  const channel = { channelId };
  const author = user || { displayname: '', username: '' };
  const chat = {
    channel,
    author,
    message,
    createdAt: new Date(),
  };

  pubsub.publish(CHAT_ADDED, { chatAdded: chat });

  return chat;
};

const chatAdded = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(CHAT_ADDED),
    (payload, variables) => payload.chatAdded.channel.channelId === variables.channelId,
  ),
};

const resolvers = {
  Mutation: {
    addChat,
  },
  Subscription: {
    chatAdded,
  },
};

module.exports = resolvers;
