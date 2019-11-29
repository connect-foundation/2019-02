import React from 'react';
import PropTypes from 'prop-types';
import { useInitChatLogs, useGetUserStatus } from '@/hooks';
import ChatBox from './ChatBox';

const Chat = ({ channelId }) => {
  const { userId } = useGetUserStatus();

  useInitChatLogs(channelId);

  return (
    <ChatBox channelId={channelId} userId={userId} />
  );
};

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Chat;
