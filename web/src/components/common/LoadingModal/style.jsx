import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  LoadingModal: styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.common.white}
  `,
  LoadingModalContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${px(500)};
    height: 100%;
    margin-top: ${px(-64)};
    padding-top: ${px(350)};
  `,
};
