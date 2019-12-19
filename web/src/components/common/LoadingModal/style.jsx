import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  LoadingModal: styled.div`
    display: flex;
    position: fixed;
    top: ${px(50)};
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.common.white}
  `,
};
