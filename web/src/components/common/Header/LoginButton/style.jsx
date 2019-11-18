import styled from 'styled-components';

export default {
  GoogleLoginButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.google};
    height: 100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
  `,
  KakaoLoginButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.kakao};
    height:100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
  `,
  NaverLoginButton: styled('button')`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.naver};
    height: 100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
  `,
};
