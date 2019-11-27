import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useChatChanged } from '@/hooks';
import ChatCard from './ChatCard';
import S from './style';
import { computeScrollEndTop } from '@/utils/dom';

const ChatLogs = (props) => {
  const scrollWrapRef = useRef(null);
  const { channelId, userId } = props;
  const { data } = useChatChanged(channelId);
  const chatLogs = data;

  useEffect(() => {
    const scrollWrapEl = scrollWrapRef.current;
    const endTop = computeScrollEndTop(scrollWrapEl);

    scrollWrapRef.current.scrollTop = endTop;
  }, [chatLogs]);

  return (
    <S.ChatLogsWrapper>
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
    </S.ChatLogsWrapper>
  );
};

ChatLogs.propTypes = {
  channelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatLogs;
