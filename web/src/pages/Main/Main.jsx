import React from 'react';
import { ChannelButton, MainLogo } from '../../components/main';
import S from './style';

const Main = () => (
  <S.MainWrapper>
    <S.Main>
      <MainLogo />
      <ChannelButton />
    </S.Main>
  </S.MainWrapper>
);

export default Main;
