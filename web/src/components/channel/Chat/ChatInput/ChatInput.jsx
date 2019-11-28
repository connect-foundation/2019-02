import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAddChat } from '@/hooks';
import { CHAT_INPUT_PLACEHOLDER } from '@/constants';
import S from './style';

const KEYCODE_ENTER = 13;

const ChatInput = (props) => {
  const [message, setMessage] = useState('');
  const { mutate } = useAddChat();
  const { channelId } = props;
  const sendMessage = () => {
    if (message === '') return;

    mutate({ variables: { channelId, message } });
    setMessage('');
  };
  const handleChangeInput = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyDownInput = (event) => {
    if (event.keyCode === KEYCODE_ENTER && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <S.ChatInput>
      <S.MessageInput
        placeholder={CHAT_INPUT_PLACEHOLDER}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
        value={message}
      />
      <S.SendButton
        type="button"
        onClick={sendMessage}
      >
        전송
      </S.SendButton>
    </S.ChatInput>
  );
};

ChatInput.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default ChatInput;
