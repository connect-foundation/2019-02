import styled from 'styled-components';
import closeIcon from '@@/icon_x_512x512_white.png';
import { px } from '@/styles/themeUtil';

export default {
  DropCloseButton: styled.div`
    position: absolute;
    z-index: 999;
    top: ${px(35)};
    right: ${px(35)};
    width: ${px(60)};
    height: ${px(60)};
    text-align: center;
    cursor: pointer;
  `,
  CloseIcon: styled.img.attrs({
    src: closeIcon,
    alt: 'DropModal_close_icon',
  })`
    width: ${px(25)};
    height: ${px(25)};
    margin-top: ${px(15)};
  `,
};
