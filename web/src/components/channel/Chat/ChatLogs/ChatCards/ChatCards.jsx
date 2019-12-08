import React from 'react';
import PropTypes from 'prop-types';
import { useLikeChat } from '@/hooks';
import ChatCard from './ChatCard';
import S from './style';

const ChatCards = (props) => {
  const { userId, chats } = props;
  const { mutate } = useLikeChat();

  return (
    <S.ChatLogs>
      {chats.map(({
        id,
        author,
        message,
        likes,
      }) => (
        <S.ChatLog key={`chat-log-${id}`}>
          <ChatCard
            author={author}
            message={message}
            isLiked={likes.includes(userId)}
            likesCount={likes.length}
            handleClickLike={() => mutate({ variables: { chatId: id } })}
          />
        </S.ChatLog>
      ))}
    </S.ChatLogs>
  );
};

ChatCards.propTypes = {
  userId: PropTypes.string.isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userId: PropTypes.string,
      displayName: PropTypes.string,
    }).isRequired,
    message: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default ChatCards;
