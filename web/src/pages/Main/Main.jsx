import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropModal,
  CodeInput,
  ChannelListModal,
} from '@/components/main';
import { ErrorModal } from '@/components/common';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const Main = () => {
  const { isAnonymous } = useGetUserStatus();
  const [showDropModal, setShowDropModal] = useState(false);
  const [showChannelListModal, SetShowChannelListModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const DragDropModal = !isAnonymous ? <DropModal /> : (
    <ErrorModal message="로그인한 사용자만 채널을 생성할 수 있습니다." />
  );

  return (
    <>
      <S.MainWrapper>
        <S.Main>
          <MainLogo />
          <CodeInput
            SetShowChannelListModal={SetShowChannelListModal}
            setChannels={setChannels}
          />
          <ChannelButton onClick={() => setShowDropModal(true)} />
        </S.Main>
      </S.MainWrapper>
      {showDropModal && DragDropModal}
      {showChannelListModal && <ChannelListModal channels={channels} />}
    </>
  );
};

export default Main;
