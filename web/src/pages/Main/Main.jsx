import React, { useState } from 'react';
import {
  ChannelButton,
  MainLogo,
  DropZone,
  CodeInput,
  ChannelListModal,
} from '@/components/main';
import S from './style';

const Main = () => {
  const [showDropModal, setShowDropModal] = useState(false);
  const [showChannelListModal, SetShowChannelListModal] = useState(false);
  const [channels, setChannels] = useState([]);

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
      {showChannelListModal && <ChannelListModal channels={channels} />}
      {showDropModal && <DropZone />}
    </>
  );
};

export default Main;
