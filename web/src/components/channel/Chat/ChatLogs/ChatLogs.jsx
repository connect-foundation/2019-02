import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatCards from './ChatCards';
import { useGetChatsCached } from '@/hooks';
import { scrollToTop, scrollToEnd } from '@/utils/dom';
import {
  CHAT_ADDED,
  CHAT_UPDATED,
  CHAT_SORT_BY_RECENT,
  CHAT_INIT,
  MY_CHAT_ADDED,
} from '@/constants';
import { getType } from '@/graphql/cache/chat';
import S from './style';

const sortByRecentCallback = (prev, next) => prev.createdAt - next.createdAt;
const sortByLikeCallback = (prev, next) => next.likes.length - prev.likes.length;
const scrollOnChatInit = (el, sortType) => (sortType === CHAT_SORT_BY_RECENT
  ? scrollToEnd(el)
  : scrollToTop(el));
const scrollOnChatAdded = (el, sortType) => (sortType === CHAT_SORT_BY_RECENT
  ? scrollToEnd(el, (targetTop) => targetTop - el.scrollTop < 700)
  : scrollToTop(el));
const scrollOnMyChatAdded = (el) => scrollToEnd(el);
const scrollOnChatUpdated = () => null;
const scrollCommander = {
  [CHAT_INIT]: scrollOnChatInit,
  [CHAT_ADDED]: scrollOnChatAdded,
  [MY_CHAT_ADDED]: scrollOnMyChatAdded,
  [CHAT_UPDATED]: scrollOnChatUpdated,
};

const ChatLogs = (props) => {
  const scrollWrapRef = useRef(null);
  const { userId, questionToggle, slideLength } = props;
  const { loading, chatCache } = useGetChatsCached();

  if (loading) return <p>loading...</p>;

  const { logs, changeAction, sortType } = chatCache;
  const changeType = getType(changeAction);
  const sortCallback = sortType === CHAT_SORT_BY_RECENT ? sortByRecentCallback : sortByLikeCallback;
  const chatLogsSorted = logs.sort(sortCallback);
  const chatLogs = questionToggle ? chatLogsSorted.filter((log) => log.isQuestion) : chatLogsSorted;
  const changeScrollPosition = () => {
    const scrollWrapEl = scrollWrapRef.current;
    const move = scrollCommander[changeType];

    if (move) move(scrollWrapEl, sortType);
  };

  useEffect(changeScrollPosition, [sortType, changeAction]);

  return (
    <S.ChatLogs>
      <S.ScrollWrap ref={scrollWrapRef}>
        <ChatCards
          userId={userId}
          chats={chatLogs}
          slideLength={slideLength}
        />
      </S.ScrollWrap>
    </S.ChatLogs>
  );
};

ChatLogs.propTypes = {
  userId: PropTypes.string.isRequired,
  questionToggle: PropTypes.bool.isRequired,
  slideLength: PropTypes.number.isRequired,
};

export default ChatLogs;
