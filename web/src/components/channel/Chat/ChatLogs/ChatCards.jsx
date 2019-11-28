import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatCard from './ChatCard';
import { useGetChatsCached } from '@/hooks';
import { computeScrollEndTop } from '@/utils/dom';
import {
  CHAT_ADDED,
  CHAT_SORT_BY_LIKE,
  CHAT_SORT_BY_RECENT,
} from '@/constants';
import S from './style';

const ChatCards = (props) => {
  const scrollWrapRef = useRef(null);
  const { userId } = props;
  const { logs, changeType, sortType } = useGetChatsCached();
  const sortCallback = sortType === CHAT_SORT_BY_LIKE
    ? (prev, next) => next.likes.length - prev.likes.length
    : (prev, next) => prev.createdAt - next.createdAt;
  const chatLogs = logs.sort(sortCallback);
  const changeScrollTop = (always) => () => {
    const scrollWrapEl = scrollWrapRef.current;
    const targetTop = sortType === CHAT_SORT_BY_RECENT ? computeScrollEndTop(scrollWrapEl) : 0;

    if (always) {
      scrollWrapEl.scrollTop = targetTop;
      return;
    }

    const isAllowedRange = targetTop - scrollWrapEl.scrollTop < 400;

    if (changeType === CHAT_ADDED && isAllowedRange) {
      scrollWrapEl.scrollTop = targetTop;
    }
  };

  useEffect(changeScrollTop(), [logs]);
  useEffect(changeScrollTop(true), [sortType]);

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
