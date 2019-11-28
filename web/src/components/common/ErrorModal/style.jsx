import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  ErrorModal: styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.common.white}
  `,
  ErrorModalContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 100%;
    margin-top: ${px(-64)};
    padding-top: ${px(150)};
  `,
};
