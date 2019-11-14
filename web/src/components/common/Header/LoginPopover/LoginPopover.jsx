import React from 'react';
import styled from 'styled-components';
import GoogleButton from '../LoginButton/GoogleButton';
import KakaoButton from '../LoginButton/KakaoButton';
import NaverButton from '../LoginButton/NaverButton';

const LoginPopover = () => (
  <S.PopoverWrapper>
    <S.BtnWrapper>
      <GoogleButton />
    </S.BtnWrapper>
    <S.BtnWrapper>
      <KakaoButton />
    </S.BtnWrapper>
    <S.BtnWrapper>
      <NaverButton />
    </S.BtnWrapper>
  </S.PopoverWrapper>
);

const S = {
  PopoverWrapper: styled.div`
    width:300px;
    padding:20px 15px;
  `,
  BtnWrapper: styled.div`
    width:100%;
    height:40px;
    margin-bottom:15px;
    &:last-child{
      margin-bottom:0;
    }
  `,
};

export default LoginPopover;
