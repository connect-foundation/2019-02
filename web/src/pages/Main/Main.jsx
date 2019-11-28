import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropZone,
} from '@/components/main';
import { ErrorModal } from '@/components/common';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const Main = () => {
  const { isAnonymous } = useGetUserStatus();
  const [showDropModal, setShowDropModal] = useState(false);
  const DropModal = !isAnonymous ? <DropZone /> : (
    <ErrorModal message="로그인한 사용자만 채널을 생성할 수 있습니다." />
  );

  return (
    <>
      <S.MainWrapper>
        <S.Main>
          <MainLogo />
          <ChannelButton onClick={() => setShowDropModal(true)} />
        </S.Main>
      </S.MainWrapper>
      {showDropModal && DropModal}
    </>
  );
};

export default Main;
