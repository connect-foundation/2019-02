import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropZone,
  CodeInput,
} from '@/components/main';
import S from './style';

const Main = () => {
  const [showDropModal, setShowDropModal] = useState(false);

  return (
    <>
      <S.MainWrapper>
        <S.Main>
          <MainLogo />
          <CodeInput />
          <ChannelButton onClick={() => setShowDropModal(true)} />
        </S.Main>
      </S.MainWrapper>
      {showDropModal && <DropZone />}
    </>
  );
};

export default Main;
