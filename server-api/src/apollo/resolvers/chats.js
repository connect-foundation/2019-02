const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');

const CHAT_CHANGED = 'CHAT_CHANGED';

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
      likes: [],
      createdAt: newChat.createdAt,
    };

    pubsub.publish(CHAT_CHANGED, { chatChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const chatChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(CHAT_CHANGED),
    (payload, variables) => payload.chatChanged.channelId === variables.channelId,
  ),
};

const resolvers = {
  Mutation: {
    addChat,
  },
  Subscription: {
    chatChanged,
  },
};

module.exports = resolvers;
