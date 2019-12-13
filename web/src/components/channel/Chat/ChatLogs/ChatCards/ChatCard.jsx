/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useGetQuestion,
  useDispatch,
  useChannelSelector,
} from '@/hooks';
import { parseTag } from '@/utils';

const ChatCard = (props) => {
  const {
    author,
    message,
    isLiked,
    likesCount,
    handleClickLike,
  } = props;
  const dispatch = useDispatch();
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const tokens = useGetQuestion({ text: message, limit: slideUrls.length });
  const handleSetPage = (token) => () => {
    const { nextPage, isExist } = parseTag(token, slideUrls.length);
    if (!isExist) return;

    dispatch({ type: 'SET_ISSYNC', payload: { isSync: false } });
    dispatch({ type: 'SET_PAGE', payload: { page: nextPage - 1 } });
  };
  const renderQuestion = () => tokens.map(({ id, token, isQtag }) => {
    const { isExist } = parseTag(token, slideUrls.length);
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
};

export default ChatCard;
