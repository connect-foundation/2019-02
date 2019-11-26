import React from 'react';
import PropTypes from 'prop-types';
import { useChatAdded } from '@/hooks';
import ChatCard from './ChatCard';
import S from './style';

const ChatLogs = (props) => {
  const { channelId } = props;
  const { data } = useChatAdded(channelId);

  return (
    <S.ChatLogsWrapper>
      <S.ScrollWrap>
        <S.Scroller>
          {data && data.map(({
            author,
            message,
          }, i) => (
            <S.ChatLog key={`chat-log-${i * i}`}>
              <ChatCard
                author={author}
                message={message}
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
