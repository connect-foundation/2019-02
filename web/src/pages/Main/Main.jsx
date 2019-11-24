import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropModal,
} from '@/components/main';
import S from './style';

const Main = () => {
  const [showDropModal, setShowDropModal] = useState(false);

  return (
    <>
      <S.MainWrapper>
        <S.Main>
          <MainLogo />
          <ChannelButton onClick={() => setShowDropModal(true)} />
        </S.Main>
      </S.MainWrapper>
      {showDropModal && <DropModal />}
    </>
  );
};

export default Main;
