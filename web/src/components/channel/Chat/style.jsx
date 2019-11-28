import styled from 'styled-components';
import { px } from '@/styles';

export default {
  Chat: styled.div`
    display: flex;
    flex: 0 0 auto;
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
