import React from 'react';
import PropTypes from 'prop-types';
import { useChatChanged, useGetUserStatus } from '@/hooks';
import ChatCard from './ChatCard';
import S from './style';

const ChatLogs = (props) => {
  const { channelId } = props;
  const { userId } = useGetUserStatus();
  const { data } = useChatChanged(channelId);

  return (
    <S.ChatLogsWrapper>
      <S.ScrollWrap>
        <S.Scroller>
          {data && data.map(({
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
};

export default ChatLogs;
