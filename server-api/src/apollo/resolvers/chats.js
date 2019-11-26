const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');

const CHAT_ADDED = 'CHAT_ADDED';

const addChat = async (_, { channelId, message }, { user, pubsub }) => {
  const author = user || { displayName: '익명', userId: 'null' };
  try {
    const newChat = await new Chat({
      channelId,
      displayName: author.displayName,
      message,
    }).save();
    const payload = {
      id: newChat.id,
      channelId,
      author,
      message,
      createdAt: newChat.createdAt,
    };

    pubsub.publish(CHAT_ADDED, { chatAdded: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const chatAdded = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(CHAT_ADDED),
    (payload, variables) => payload.chatAdded.channelId === variables.channelId,
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
