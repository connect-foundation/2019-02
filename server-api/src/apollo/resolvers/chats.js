const { withFilter, ApolloError } = require('apollo-server-express');
const Chat = require('../../models/chats');
const { assignFilter } = require('../../utils/object');

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
      isLiked: false,
      likesCount: 0,
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
    let isLiked = indexOfUserId !== -1;

    if (isLiked) {
      newLikes.splice(indexOfUserId, 1);
    } else {
      newLikes.push(user.userId);
    }

    isLiked = !isLiked;
    chat.likes = newLikes;
    await chat.save();

    const payload = assignFilter(
      [
        'id',
        'channelId',
        'author',
        'message',
        'isLiked',
        'likesCount',
        'createdAt',
      ],
      chat,
      {
        author: { userId: null, displayName: chat.displayName },
        isLiked,
        likesCount: newLikes.length,
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
