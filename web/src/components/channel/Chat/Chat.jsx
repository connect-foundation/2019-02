import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useChatChanged, useInitChat } from '@/hooks';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import ChatSort from './ChatSort';
import S from './style';

const Chat = (props) => {
  const { channelId, userId } = props;
  const [isClosed, setIsClosed] = useState(false);

  useInitChat(channelId);
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
  userId: PropTypes.string.isRequired,
};

export default Chat;
