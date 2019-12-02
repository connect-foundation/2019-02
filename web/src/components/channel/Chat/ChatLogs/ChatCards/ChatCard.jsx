import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const ChatCard = (props) => {
  const {
    author,
    message,
    isLiked,
    likesCount,
    handleClickLike,
  } = props;

  return (
    <S.ChatCard>
      <S.Author>{author.displayName}</S.Author>
      <S.Message>{message}</S.Message>
      <S.AreaButtons>
        <S.LikeButton onClick={handleClickLike}>
          <S.LikeIcon isActive={isLiked} />
          {likesCount}
        </S.LikeButton>
      </S.AreaButtons>
    </S.ChatCard>
  );
};

ChatCard.propTypes = {
  author: PropTypes.shape({
    userId: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  message: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  handleClickLike: PropTypes.func.isRequired,
};

export default ChatCard;
