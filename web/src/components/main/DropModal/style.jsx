import styled from 'styled-components';
import { px, colorGray } from '@/styles';

export default {
  DropModal: styled.div`
    position: absolute;
    top: ${px(50)};
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${colorGray(7)}E6;
  `,
  DropModalContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
};
