import React, { useState } from 'react';
import S from './style';

const CodeInput = () => {
  const [channelCode, setChannelCode] = useState('');
  const handleOnClick = (event) => {
    // TODO
  };
  const handleOnChange = (event) => {
    setChannelCode(event.target.value);
  };
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

export default CodeInput;
