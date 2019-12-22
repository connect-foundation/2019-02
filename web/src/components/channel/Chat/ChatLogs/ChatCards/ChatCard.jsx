/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useGetQuestion,
  useDispatch,
} from '@/hooks';
import { parseTag } from '@/utils';
import {
  CHANNEL_REDUCER_SET_ISSYNC,
  CHANNEL_REDUCER_SET_PAGE,
} from '@/constants';

const ChatCard = (props) => {
  const {
    author,
    message,
    isLiked,
    likesCount,
    handleClickLike,
    slideLength,
  } = props;
  const dispatch = useDispatch();
  const tokens = useGetQuestion({ text: message, limit: slideLength });
  const handleSetPage = (token) => () => {
    const { nextPage, isExist } = parseTag(token, slideLength);
    if (!isExist) return;

    dispatch({ type: CHANNEL_REDUCER_SET_ISSYNC, payload: { isSync: false } });
    dispatch({ type: CHANNEL_REDUCER_SET_PAGE, payload: { page: nextPage - 1 } });
  };
  const renderQuestion = () => tokens.map(({ id, token, isQtag }) => {
    const { isExist } = parseTag(token, slideLength);
    const noneQuestion = isQtag && !isExist ? 'disable' : 'nomal';
    const state = isQtag && isExist ? 'question' : noneQuestion;

    return ({
      question:
        <S.Question key={id} onClick={handleSetPage(token)}>
          {token}
        </S.Question>,
      disable:
        <S.DisableQ key={id}>
          {token}
        </S.DisableQ>,
      nomal: token,
    }[state]);
  });

  return (
    <S.ChatCard isQuestion={tokens ? 1 : 0}>
      <S.Author>{author.displayName}</S.Author>
      <S.Message>
        {!tokens ? message : renderQuestion()}
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
  slideLength: PropTypes.number.isRequired,
};

export default ChatCard;
