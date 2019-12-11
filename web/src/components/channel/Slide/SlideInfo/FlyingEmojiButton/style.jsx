import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  EmojiButton: styled.span`
    font-size: ${px(20)};
    margin: ${px(3)};
    cursor: pointer;
  `,
  EmojiSmallButton: styled.div`
    background: ${colorGray(5)};
    box-shadow: 0 ${px(2)} ${px(9)} rgba(0, 0, 0, 0.03);
    border-radius: ${px(20)};
    height: ${px(32)};
    margin-left: ${px(10)};
  `,
};
