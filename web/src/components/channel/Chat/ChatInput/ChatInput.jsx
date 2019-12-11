import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAddChat, useDispatch } from '@/hooks';
import { CHAT_INPUT_PLACEHOLDER } from '@/constants';
import S from './style';

const KEYCODE_ENTER = 13;

const ChatInput = (props) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
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
  const handleFocus = (isChat) => () => {
    dispatch({
      type: 'SET_ISCHAT',
      payload: { isChat },
    });
  };

  return (
    <S.ChatInput>
      <S.MessageInput
        placeholder={CHAT_INPUT_PLACEHOLDER}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
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
