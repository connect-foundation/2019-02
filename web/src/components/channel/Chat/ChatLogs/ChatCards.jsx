import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatCard from './ChatCard';
import { useGetChatsCached } from '@/hooks';
import { computeScrollEndTop } from '@/utils/dom';
import S from './style';

const ChatCards = (props) => {
  const scrollWrapRef = useRef(null);
  const { userId } = props;
  const chatLogs = useGetChatsCached();

  useEffect(() => {
    const scrollWrapEl = scrollWrapRef.current;
    const endTop = computeScrollEndTop(scrollWrapEl);

    scrollWrapRef.current.scrollTop = endTop;
  }, [chatLogs]);

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
