import React from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import S from './style';
import { useInitChatLogs } from '@/hooks';

const Chat = ({ channelId }) => {
  useInitChatLogs(channelId);

  return (
    <S.ChatWrapper>
      <ChatLogs
        channelId={channelId}
      />
      <ChatInput channelId={channelId} />
    </S.ChatWrapper>
  );
};

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Chat;
