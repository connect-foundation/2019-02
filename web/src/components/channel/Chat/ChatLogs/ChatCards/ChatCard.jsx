import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useGetQuestion, useDispatch } from '@/hooks';

const ChatCard = (props) => {
  const {
    author,
    message,
    isLiked,
    likesCount,
    handleClickLike,
  } = props;
  const [tokens] = useGetQuestion(message);
  const dispatch = useDispatch();

  const handleSetPage = (token) => () => {
    const nextPage = token.split('#')[1];
    dispatch({ type: 'SET_PAGE', payload: { page: nextPage - 1 } });
  };

  return (
    <S.ChatCard isQuestion={tokens ? 1 : 0}>
      <S.Author>{author.displayName}</S.Author>
      <S.Message>
        {!tokens ? message : tokens.map(({ token, isQtag }, index) => (isQtag ? (
          <S.Question key={index} onClick={handleSetPage(token)}>
            {token}
          </S.Question>
        ) : token))}
      </S.Message>
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
