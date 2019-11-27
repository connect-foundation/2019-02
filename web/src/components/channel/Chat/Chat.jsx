import React from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import S from './style';

const Chat = ({ channelId }) => (
  <S.ChatWrapper>
    <ChatLogs channelId={channelId} />
    <ChatInput channelId={channelId} />
  </S.ChatWrapper>
);

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Chat;
