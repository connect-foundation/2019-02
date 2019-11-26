import styled from 'styled-components';
import { px } from '@/styles';

export default {
  UserInfoButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    height: 88px;
    cursor: pointer;
    font-size: ${px(16)};
    border-bottom: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])};
    &:first-of-type {
      margin-top: 30px;
      border-top: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])};
    }
    &:hover {
      background: ${(({ theme }) => theme.palette.secondary.main)};
    }
  `,
};
