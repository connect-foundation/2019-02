import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useLikeChat } from '@/hooks';

const ChatCard = (props) => {
  const {
    id,
    author,
    message,
    isLiked,
    likesCount,
  } = props;
  const { mutate } = useLikeChat();
  const handleClickLikeButton = () => mutate({ variables: { chatId: id } });

  return (
    <S.ChatCard data-id={id}>
      <S.Author>{author.displayName}</S.Author>
      <S.Message>{message}</S.Message>
      <S.AreaButtons>
        <S.LikeButton
          isActive={isLiked}
          onClick={handleClickLikeButton}
        >
          {likesCount}
        </S.LikeButton>
      </S.AreaButtons>
    </S.ChatCard>
  );
};

ChatCard.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    userId: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  message: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default ChatCard;
