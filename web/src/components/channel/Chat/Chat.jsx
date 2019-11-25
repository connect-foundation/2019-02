import React from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';

const Chat = ({ channelId }) => (
  <>
    <ChatInput channelId={channelId} />
    <ChatLogs channelId={channelId} />
  </>
);

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Chat;
