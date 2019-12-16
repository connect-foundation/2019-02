import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatCards from './ChatCards';
import { useGetChatsCached } from '@/hooks';
import { computeScrollEndTop } from '@/utils/dom';
import {
  CHAT_ADDED,
  CHAT_SORT_BY_RECENT,
} from '@/constants';
import S from './style';

const ChatLogs = (props) => {
  const scrollWrapRef = useRef(null);
  const { userId, questionToggle } = props;
  const { loading, chatCache } = useGetChatsCached();

  if (loading) return <p>loading...</p>;

  const { logs, changeType, sortType } = chatCache;
  const sortByRecent = sortType === CHAT_SORT_BY_RECENT;
  const sortCallback = sortByRecent
    ? (prev, next) => prev.createdAt - next.createdAt
    : (prev, next) => next.likes.length - prev.likes.length;

  const chatLogsSort = logs.sort(sortCallback);
  const chatLogs = questionToggle ? chatLogsSort.filter((log) => log.isQuestion) : chatLogsSort;

  const changeScrollTop = (always) => () => {
    const scrollWrapEl = scrollWrapRef.current;
    const targetTop = sortByRecent ? computeScrollEndTop(scrollWrapEl) : 0;

    if (always) {
      scrollWrapEl.scrollTop = targetTop;
      return;
    }

    const isAllowedRange = targetTop - scrollWrapEl.scrollTop < 700;

    if (changeType === CHAT_ADDED && isAllowedRange) {
      scrollWrapEl.scrollTop = targetTop;
    }
  };

  useEffect(changeScrollTop(), [logs]);
  useEffect(changeScrollTop(true), [sortType]);

  return (
    <S.ChatLogs>
      <S.ScrollWrap ref={scrollWrapRef}>
        <ChatCards userId={userId} chats={chatLogs} />
      </S.ScrollWrap>
    </S.ChatLogs>
  );
};

ChatLogs.propTypes = {
  userId: PropTypes.string.isRequired,
  questionToggle: PropTypes.bool.isRequired,
};

export default ChatLogs;
