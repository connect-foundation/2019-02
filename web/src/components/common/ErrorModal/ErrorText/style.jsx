import styled from 'styled-components';
import { px, colorGray } from '@/styles';

export default {
  ErrorTitle: styled.div`
    color: ${colorGray(9)};
    font-size: ${px(35)};
  `,
  ErrorText: styled.div`
    color: ${({ theme }) => theme.palette.primary.main};
    white-space: nowrap;
    text-align: center;
    font-weight: 300;
    font-size: ${px(20)};
    margin-bottom: ${px(20)};
    margin-top: ${px(10)};
  `,
};
