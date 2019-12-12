import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useGetQuestion,
  useDispatch,
  useChannelSelector,
} from '@/hooks';
import tagParser from '@/utils/tagParser';

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
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const handleSetPage = (token) => () => {
    const { nextPage, isExist } = tagParser(token, slideUrls.length);
    if (!isExist) return;

    dispatch({ type: 'SET_ISSYNC', payload: { isSync: false } });
    dispatch({ type: 'SET_PAGE', payload: { page: nextPage - 1 } });
  };
  const renderQuestion = () => tokens.map(({ id, token, isQtag }) => {
    const { isExist } = tagParser(token, slideUrls.length);
    return (isQtag && isExist ? (
      <S.Question key={id} onClick={handleSetPage(token)}>
        {token}
      </S.Question>
    ) : token);
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
