import styled from 'styled-components';
import { px } from '@/styles';

export default {
  ErrorModal: styled.div`
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
    background-color: ${({ theme }) => theme.palette.common.white}
  `,
};
