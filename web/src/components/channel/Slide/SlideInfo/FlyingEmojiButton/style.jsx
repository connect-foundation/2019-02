import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  EmojiButton: styled.span`
    width: ${px(26)};
    height: ${px(26)};
    display: inline-block;
    position: relative;
    text-align: right;
    user-select: none;
    border-radius: 50%;
    font-size: ${px(18)};
    margin: ${px(3)};
    cursor: pointer;
    user-select: none;
    background: #FFF;
    box-shadow: 0 ${px(1)} ${px(9)} rgba(0, 0, 0, 0.1);
  `,
  EmojiSmallButton: styled.div`
    background: ${colorGray(5)};
    box-shadow: 0 ${px(2)} ${px(9)} rgba(0, 0, 0, 0.03);
    border-radius: ${px(20)};
    height: ${px(32)};
    min-width: ${px(98)};
    margin-left: ${px(10)};
    user-select: none;
  `,
};
