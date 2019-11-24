const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');

const CHAT_ADDED = 'CHAT_ADDED';

const addChat = async (_, { channelId, message }, { user, pubsub }) => {
  const channel = { channelId };
  const author = user || { displayname: '익명', username: 'null' };
  try {
    const newChat = await new Chat({
      channelId,
      displayName: author.displayname,
      message,
    }).save();
    const payload = {
      channel,
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
