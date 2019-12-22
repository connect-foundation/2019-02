import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useAddChat,
  useAnonymousChanged,
  useGetUserStatus,
  useDispatch,
} from '@/hooks';
import {
  pipe,
  parseMessage,
  checkIsQuestion,
} from '@/utils';
import {
  CHAT_INPUT_PLACEHOLDER,
  CHAT_ANONYMOUS_PLACEHOLDER,
  CHANNEL_REDUCER_SET_ISCHAT,
} from '@/constants';
import S from './style';


const KEYCODE_ENTER = 13;

const ChatInput = (props) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { mutate } = useAddChat();
  const { isAnonymous } = useGetUserStatus();
  const { channelId, setQuestionToggle, slideLength } = props;
  const { anonymousChat } = useAnonymousChanged(channelId);
  const sendMessage = () => {
    if (message === '') return;
    const { isQuestion } = pipe(parseMessage, checkIsQuestion)({ text: message, slideLength });

    mutate({ variables: { channelId, message, isQuestion } });
    setMessage('');
    setQuestionToggle(false);
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
      type: CHANNEL_REDUCER_SET_ISCHAT,
      payload: { isChat },
    });
  };
  const handleAnonymous = (input, anonymousInput) => {
    if (anonymousChat || !isAnonymous) return input;
    return anonymousInput;
  };

  useEffect(() => {
    if (anonymousChat || !isAnonymous) return;
    setMessage('');
  }, [anonymousChat, isAnonymous]);

  return (
    <S.ChatInput>
      <S.MessageInput
        placeholder={handleAnonymous(CHAT_INPUT_PLACEHOLDER, CHAT_ANONYMOUS_PLACEHOLDER)}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        anonymousChat={!anonymousChat && isAnonymous}
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
  setQuestionToggle: PropTypes.func.isRequired,
  slideLength: PropTypes.number.isRequired,
};

export default ChatInput;
