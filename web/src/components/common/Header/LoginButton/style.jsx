import styled from 'styled-components';

export default {
  GoogleLoginButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.google};
    height: 100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
    font-weight: 700;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  `,
  KakaoLoginButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.kakao};
    height:100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
    font-weight: 700;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  `,
  NaverLoginButton: styled('button')`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.naver};
    height: 100%;
    border-radius: 2px;
    box-shadow: ${({ theme }) => theme.palette.shadow.button};
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  `,
};
