import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import S from './style';
import { useGetChannelsByCode } from '@/hooks';
import { ErrorModal } from '@/components/common';
import { NO_EXIST_CHANNEL_MESSAGE, CODEINPUT_PLACEHOLDER } from '@/constants';

const CodeInput = (props) => {
  const { SetShowChannelListModal, setChannels } = props;
  const [channelCode, setChannelCode] = useState('');
  const { query, data } = useGetChannelsByCode();
  const handleOnClick = () => {
    query({ variables: { channelCode } });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      query({ variables: { channelCode } });
    }
  };
  const handleOnChange = (event) => {
    const { value } = event.target;
    const code = value.length > 5 ? value.substring(0, 5) : value;

    setChannelCode(code);
  };

  if (data.status === 'ok') {
    const channelCount = data.channels.length;
    if (channelCount === 1) {
      const { channelId } = data.channels[0];
      return <Redirect to={`/channels/${channelId}`} />;
    } if (!channelCount) {
      return <ErrorModal message={NO_EXIST_CHANNEL_MESSAGE} />;
    }
    SetShowChannelListModal(true);
    setChannels(data.channels);
  }

  return (
    <S.CodeInput>
      <S.CodeInputContent
        placeholder={CODEINPUT_PLACEHOLDER}
        onChange={handleOnChange}
        value={channelCode}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <S.EnterButton
        type="button"
        onClick={handleOnClick}
      >
        <span role="img" aria-label="drop_enter_Emoji">👉</span>
      </S.EnterButton>
    </S.CodeInput>
  );
};

CodeInput.propTypes = {
  SetShowChannelListModal: PropTypes.func.isRequired,
  setChannels: PropTypes.func.isRequired,
};

export default CodeInput;
