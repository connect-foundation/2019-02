import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoGoogleUrl from '@@/logo_google.svg';
import logoKakaoUrl from '@@/logo_kakao.svg';
import logoNaverUrl from '@@/logo_naver.svg';
import { px, colorYellow } from '@/styles/themeUtil';

const CommonLoginButton = styled.button.attrs({ type: 'button' })`
  display: block;
  box-sizing: border-box;
  width: ${px(280)};
  height: ${px(50)};
  border: ${px(1)} solid rgba(0, 0, 0, 0.05);
  border-radius: ${px(2)};
  padding-left: ${px(5)};
  font-size: ${px(16)};
  line-height: ${px(48)};
  text-align: center;
  cursor: pointer;
`;

export default {
  GoogleLoginButton: styled(CommonLoginButton)`
    background: ${({ theme }) => theme.palette.google} url(${logoGoogleUrl}) no-repeat ${px(16)} 50%/auto ${px(24)};
    border-color: #ccc;
    color: #333;
  `,
  KakaoLoginButton: styled(CommonLoginButton)`
    background: ${({ theme }) => theme.palette.kakao} url(${logoKakaoUrl}) no-repeat ${px(14)} 50%/auto ${px(28)};
  `,
  NaverLoginButton: styled(CommonLoginButton)`
    background: ${({ theme }) => theme.palette.naver} url(${logoNaverUrl}) no-repeat ${px(12)} 50%/auto ${px(34)};
    color: #fff;
  `,
  PrivacyLink: styled(Link)`
    display: block;
    box-sizing: border-box;
    width: ${px(280)};
    height: ${px(30)};
    border: 0;
    background: transparent;
    font-size: ${px(15)};
    line-height: ${px(24)};
    text-align: center;
    cursor: pointer;
    color: #555;
    &:hover {
      text-decoration: underline;
      color: ${colorYellow(9)};
    }
  `,
};
