import React from 'react';
import PropTypes from 'prop-types';
import { useChatChanged } from '@/hooks';
import ChatCard from './ChatCard';
import S from './style';

const ChatLogs = (props) => {
  const { channelId } = props;
  const { data } = useChatChanged(channelId);

  return (
    <S.ChatLogsWrapper>
      <S.ScrollWrap>
        <S.Scroller>
          {data && data.map(({
            id,
            author,
            message,
            isLiked,
            likesCount,
          }) => (
            <S.ChatLog key={`chat-log-${id}`}>
              <ChatCard
                id={id}
                author={author}
                message={message}
                isLiked={isLiked}
                likesCount={likesCount}
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
};

export default ChatLogs;
