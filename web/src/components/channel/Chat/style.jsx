import styled from 'styled-components';
import { px } from '@/styles';

export default {
  Chat: styled.div`
    float: right;
    display: flex;
    flex-direction: column;
    width: ${px(350)};
    height: 100%;
    background-color: #f8f9fa;
    transition: transform 0.5s;
    ${({ isClosed, theme }) => (isClosed ? `
    width: ${theme.typography.pxToRem(60)};
    ` : '')}
  `,
};
