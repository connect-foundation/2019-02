import styled from 'styled-components';
import { colorGray } from '@/styles/themeUtil';

const S = {
  Modal: styled.div`
    display: none;
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${colorGray(9)}E6;
    opacity: 0;
    transition: opacity 0.1s;
  `,
  ModalContent: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default S;
