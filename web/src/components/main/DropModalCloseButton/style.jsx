import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  DropCloseButton: styled.div`
    width: ${px(60)};
    height: ${px(60)};
    margin-top: ${px(80)};
    margin-right: ${px(35)};
    position: absolute;
    right: 0;
    text-align: center;
    cursor: pointer;
    z-index: 999;
  `,
  CloseIcon: styled.img.attrs({
    src: '/public/images/icon_X_button_512_512.png',
    alt: 'DropModal_close_icon',
  })`
    width: ${px(25)};
    height: ${px(25)};
    margin-top: ${px(15)};
  `,
};
