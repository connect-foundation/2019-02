import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  ChatInput: styled.div`
    flex: 0 0 auto;
    box-sizing: border-box;
    width: 100%;
    height: ${px(124)};
    padding: ${px(9)} ${px(12)} ${px(9)} ${px(16)};
    border-top: ${px(1)} solid ${colorGray(1)};
    border-radius: ${px(3)};
    box-shadow: 0 ${px(2)} ${px(20)} rgba(0, 0, 0, 0.03);
    background-color: #fff;
  `,
  MessageInput: styled.textarea.attrs(({ anonymousChat }) => ({
    type: 'text',
    disabled: !anonymousChat,
  }))`
    box-sizing: border-box;
    width: ${px(238)};
    height: ${px(84)};
    margin: ${px(11)} ${px(14)} 0 0;
    border: 0;
    background: transparent;
    font-size: ${px(16)};
    line-height: ${px(21)};
    word-break: break-all;
    color: ${colorGray(9)};
    resize: none;
    &::placeholder,
    &::-webkit-input-placeholder {
      color: ${colorGray(5)};
    }
  `,
  SendButton: styled.button.attrs({ type: 'button' })`
    box-sizing: border-box;
    width: ${px(70)};
    height: ${px(108)};
    border-radius: ${px(3)};
    border: ${px(1)} solid rgba(0, 0, 0, 0.1);
    background-color: ${colorYellow(6)};
  `,
};

export default S;
