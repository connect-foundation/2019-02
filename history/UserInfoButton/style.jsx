import styled from 'styled-components';
import { px, colorGray } from '@/styles';

export default {
  UserInfoButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    height: ${px(88)};
    cursor: pointer;
    font-size: ${px(16)};
    border-bottom: ${px(1)} solid ${colorGray(3)};
    &:first-of-type {
      margin-top: ${px(30)};
      border-top: ${px(1)} solid ${colorGray(3)};
    }
    &:hover {
      background: ${(({ theme }) => theme.palette.secondary.main)};
    }
  `,
};
