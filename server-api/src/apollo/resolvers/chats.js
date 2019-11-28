const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');

const CHAT_CHANGED = 'CHAT_CHANGED';

const addChat = async (_, { channelId, message }, { user, pubsub }) => {
  try {
    const newChat = await new Chat({
      channelId,
      userId: user.userId,
      displayName: user.displayName,
      message,
    }).save();
    const payload = newChat.toPayload({ author: user });

    pubsub.publish(CHAT_CHANGED, { chatChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const likeChat = async (_, { chatId }, { user, pubsub }) => {
  try {
    const chat = await Chat.findById(chatId);
    const indexOfUserId = chat.likes.indexOf(user.userId);
    const newLikes = [...chat.likes];

    if (indexOfUserId !== -1) {
      newLikes.splice(indexOfUserId, 1);
    } else {
      newLikes.push(user.userId);
    }

    chat.likes = newLikes;
    await chat.save();

    const author = { userId: chat.userId, displayName: chat.displayName };
    const payload = chat.toPayload({ author });

    pubsub.publish(CHAT_CHANGED, { chatChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChatLogs = async (_, { channelId }) => {
  try {
    const chats = await Chat.find({ channelId }).sort({ createdAt: 'asc' });
    const chatLogs = chats ? chats.map((chat) => chat.toPayload()) : [];

    return chatLogs;
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
  Query: {
    getChatLogs,
  },
  Mutation: {
    addChat,
    likeChat,
  },
  Subscription: {
    chatChanged,
  },
};

module.exports = resolvers;
