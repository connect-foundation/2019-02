import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropModal,
  CodeInput,
  ChannelListModal,
} from '@/components/main';
import { NEED_LOGIN_ERROR_MESSAGE } from '@/constants';
import { ErrorModal } from '@/components/common';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const Main = () => {
  const { isAnonymous } = useGetUserStatus();
  const [showDropModal, setShowDropModal] = useState(false);
  const [showChannelListModal, SetShowChannelListModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const DragDropModal = !isAnonymous ? (
    <DropModal setShowDropModal={setShowDropModal} />
  ) : (
    <ErrorModal message={NEED_LOGIN_ERROR_MESSAGE} />
  );

  return (
    <>
      <S.Main>
        <S.MainContent>
          <MainLogo />
          <CodeInput
            SetShowChannelListModal={SetShowChannelListModal}
            setChannels={setChannels}
          />
          <ChannelButton onClick={() => setShowDropModal(true)} />
        </S.MainContent>
      </S.Main>
      {showDropModal && DragDropModal}
      {showChannelListModal && <ChannelListModal channels={channels} />}
    </>
  );
};

export default Main;
