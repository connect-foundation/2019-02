import React from 'react';
import PropTypes from 'prop-types';
import { useChatChanged } from '@/hooks';
import ChatCards from './ChatCards';
import S from './style';

const ChatLogs = (props) => {
  const { channelId, userId } = props;

  useChatChanged(channelId);

  return (
    <S.ChatLogs>
      <ChatCards userId={userId} />
    </S.ChatLogs>
  );
};

ChatLogs.propTypes = {
  channelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatLogs;
