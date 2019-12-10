import styled from 'styled-components';
import { px, colorGray } from '@/styles';

export default {
  DropModal: styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colorGray(7)}E6;
  `,
  DropModalContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: ${px(500)};
    height: 100%;
    margin-top: ${px(-64)};
  `,
};
