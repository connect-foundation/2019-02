import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  ErrorModalWrapper: styled.div.attrs({ type: 'div' })`
    display: flex;
    position: fixed;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white
  `,
  ErrorModal: styled.div.attrs({ type: 'div' })`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 100%;
    margin-top:-64px;
    padding-top: ${px(150)};
  `,
};
