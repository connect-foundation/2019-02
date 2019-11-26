import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const ChatCard = (props) => {
  const {
    author,
    message,
  } = props;

  return (
    <S.ChatCard>
      <S.Author>{author.displayName}</S.Author>
      <S.Message>{message}</S.Message>
      <S.AreaButtons>
        <S.LikeButton isActive>20</S.LikeButton>
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
};

export default ChatCard;
