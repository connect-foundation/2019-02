import React from 'react';
import S from './style';
import Logo from '@/assets/dropyLogo.png';

const MainLogo = () => (
  <S.MainLogo>
    <S.LogoImg alt="logo" src={Logo} />
  </S.MainLogo>
);

export default MainLogo;
