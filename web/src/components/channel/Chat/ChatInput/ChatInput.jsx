import React, { useState } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useAddChat } from '@/hooks';

const ChatInput = (props) => {
  const [state, setState] = useState('');
  const { mutate } = useAddChat();
  const { channelId } = props;
  const handleClick = () => {
    mutate({ variables: { channelId, message: state } });
  };
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <S.ChatInputWrapper>
      <S.MessageInput
        placeholder="질문 또는 의견을 남겨주세요."
        onChange={handleChange}
        value={state}
      />
      <S.SendButton
        type="button"
        onClick={handleClick}
      >
        전송
      </S.SendButton>
    </S.ChatInputWrapper>
  );
};

ChatInput.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default ChatInput;
