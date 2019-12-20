import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useChatChanged, useInitChat } from '@/hooks';
import ChatInput from './ChatInput';
import ChatLogs from './ChatLogs';
import ChatSort from './ChatSort';
import S from './style';

const ChatToggle = (props) => {
  const { channelId, userId, slideLength } = props;
  const [isClosed, setIsClosed] = useState(false);
  const [questionToggle, setQuestionToggle] = useState(false);

  return (
    <S.Chat isClosed={isClosed}>
      <ChatSort
        isClosed={isClosed}
        questionToggle={questionToggle}
        setQuestionToggle={setQuestionToggle}
        toggleChatBox={() => {
          window.dispatchEvent(new Event('resize'));
          setIsClosed(!isClosed);
        }}
      />
      {!isClosed && (
        <>
          <ChatLogs
            channelId={channelId}
            userId={userId}
            questionToggle={questionToggle}
            slideLength={slideLength}
          />
          <ChatInput
            slideLength={slideLength}
            channelId={channelId}
            setQuestionToggle={setQuestionToggle}
          />
        </>
      )}
    </S.Chat>
  );
};

const Chat = (props) => {
  const { channelId, userId, slideLength } = props;

  useInitChat(channelId);
  useChatChanged(channelId, userId);

  return (
    <ChatToggle
      slideLength={slideLength}
      channelId={channelId}
      userId={userId}
    />
  );
};

ChatToggle.propTypes = {
  channelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  slideLength: PropTypes.number.isRequired,
};

Chat.propTypes = {
  channelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  slideLength: PropTypes.number.isRequired,

};

export default Chat;
