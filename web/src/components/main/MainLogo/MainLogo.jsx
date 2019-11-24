import React from 'react';
import Logo from '@@/dropyLogo.png';
import S from './style';

const MainLogo = () => (
  <S.MainLogo>
    <S.LogoImg alt="logo" src={Logo} />
  </S.MainLogo>
);

export default MainLogo;
