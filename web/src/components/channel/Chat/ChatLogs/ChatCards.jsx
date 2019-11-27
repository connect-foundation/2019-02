import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatCard from './ChatCard';
import { useGetChatsCached } from '@/hooks';
import { computeScrollEndTop } from '@/utils/dom';
import { CHAT_ADDED, CHAT_SORT_BY_LIKE } from '@/constants';
import S from './style';

const ChatCards = (props) => {
  const scrollWrapRef = useRef(null);
  const { userId } = props;
  const { logs, changeType, sortType } = useGetChatsCached();
  const sortCallback = sortType === CHAT_SORT_BY_LIKE
    ? (a, b) => b.likes.length - a.likes.length
    : (a, b) => a.createdAt - b.createdAt;
  const chatLogs = logs.sort(sortCallback);
  const changeScrollTop = () => {
    const scrollWrapEl = scrollWrapRef.current;
    const endTop = sortType === CHAT_SORT_BY_LIKE ? 0 : computeScrollEndTop(scrollWrapEl);

    scrollWrapRef.current.scrollTop = endTop;
  };

  useEffect(() => { if (changeType === CHAT_ADDED) changeScrollTop(); }, [logs]);
  useEffect(() => changeScrollTop(), [sortType]);

  return (
    <S.ScrollWrap ref={scrollWrapRef}>
      <S.Scroller>
        {chatLogs.map(({
          id,
          author,
          message,
          likes,
        }) => (
          <S.ChatLog key={`chat-log-${id}`}>
            <ChatCard
              id={id}
              author={author}
              message={message}
              isLiked={likes.includes(userId)}
              likesCount={likes.length}
            />
          </S.ChatLog>
        ))}
      </S.Scroller>
    </S.ScrollWrap>
  );
};

ChatCards.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ChatCards;
