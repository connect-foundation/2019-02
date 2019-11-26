const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');
const { assignFilter } = require('../../utils/object');

const CHAT_CHANGED = 'CHAT_CHANGED';

const addChat = async (_, { channelId, message }, { user, pubsub }) => {
  try {
    const newChat = await new Chat({
      channelId,
      userId: user.userId,
      displayName: user.displayName,
      message,
    }).save();
    const payload = {
      id: newChat.id,
      channelId,
      author: user,
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

    const payload = assignFilter(
      [
        'id',
        'channelId',
        'author',
        'message',
        'likes',
        'createdAt',
      ],
      chat,
      {
        author: { userId: chat.userId, displayName: chat.displayName },
        likes: newLikes,
      },
    );

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
    likeChat,
  },
  Subscription: {
    chatChanged,
  },
};

module.exports = resolvers;
