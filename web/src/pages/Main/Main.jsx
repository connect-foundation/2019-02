import React from 'react';
import { ChannelButton, MainLogo } from '../../components/main';
import S from './style';

const Main = () => (
  <S.Main>
    <S.MainWrapper>
      <MainLogo />
      <ChannelButton />
    </S.MainWrapper>
  </S.Main>
);

export default Main;
