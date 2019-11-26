import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  LoadingText: styled.div.attrs({ type: 'div' })`
    color: ${({ theme }) => theme.palette.primary.main};
    white-space: nowrap;
    text-align: center;
    font-weight: 300;
    font-size: ${px(20)};
    margin-bottom: ${px(20)};
    margin-top: ${px(10)};
  `,
};
