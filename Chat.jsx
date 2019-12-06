import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useGetUserStatus, useChatChanged } from '@/hooks';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import ChatSort from './ChatSort';
import S from './style';

const Chat = (props) => {
  const { channelId } = props;
  const [isClosed, setIsClosed] = useState(false);
  const { userId } = useGetUserStatus();

  useChatChanged(channelId);

  return (
    <S.Chat isClosed={isClosed}>
      <ChatSort
        isClosed={isClosed}
        toggleChatBox={() => {
          window.dispatchEvent(new Event('resize'));
          setIsClosed(!isClosed);
        }}
      />
      {!isClosed && (
        <>
          <ChatLogs channelId={channelId} userId={userId} />
          <ChatInput channelId={channelId} />
        </>
      )}
    </S.Chat>
  );
};

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Chat;
