import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import ChatSort from './ChatSort';
import S from './style';

const ChatBox = (props) => {
  const { channelId, userId } = props;
  const [isClosed, setIsClosed] = useState(false);

  return (
    <S.Chat isClosed={isClosed}>
      <ChatSort
        isClosed={isClosed}
        toggleChatBox={() => setIsClosed(!isClosed)}
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

ChatBox.propTypes = {
  channelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatBox;
