import styled from 'styled-components';
import { px } from '@/styles';

export default {
  UserInfoButton: styled.button.attrs({ type: 'button' })`
    width: 80%;
    height: 56px;
    background: ${(({ theme }) => theme.palette.primary.main)};
    box-shadow: ${(({ theme }) => theme.palette.shadow.button)};
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: ${px(16)};
    font-weight: 700;
    margin-top: 10px;
  `,
};
