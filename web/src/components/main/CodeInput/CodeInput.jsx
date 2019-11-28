import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import S from './style';
import { useGetChannelsByCode } from '@/hooks';

const CodeInput = (props) => {
  const { SetShowChannelListModal, setChannels } = props;
  const [channelCode, setChannelCode] = useState('');
  const { query, data } = useGetChannelsByCode();
  const handleOnClick = () => {
    query({ variables: { channelCode } });
  };
  const handleOnChange = (event) => {
    setChannelCode(event.target.value);
  };

  if (data.status === 'ok') {
    const channelCount = data.channels.length;
    if (channelCount === 1) {
      const { channelId } = data.channels[0];
      return <Redirect to={`/channels/${channelId}`} />;
    } if (!channelCount) {
      // TODO: 해당 코드를 갖고 있는 채널이 없을 경우 에러 모달 렌더링
    } else {
      SetShowChannelListModal(true);
      setChannels(data.channels);
    }
  }

  return (
    <S.CodeInput>
      <S.CodeInputContent
        placeholder="# 채널 코드"
        onChange={handleOnChange}
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
