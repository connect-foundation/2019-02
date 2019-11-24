import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    <>
      <input
        type="text"
        onChange={handleChange}
        value={state}
      />
      <button
        type="button"
        onClick={handleClick}
      >
      보내기
      </button>
    </>
  );
};

ChatInput.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default ChatInput;
