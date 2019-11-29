import styled from 'styled-components';
import { px, colorGray } from '@/styles/themeUtil';

export default {
  CodeInput: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: ${px(56)};
    left: ${px(511)};
    top: ${px(595)};
    background: #F8F9FA;
    box-shadow: ${px(0)} ${px(2)} ${px(19)} rgba(134, 142, 150, 0.4);
    border-radius: ${px(5)};
    margin-bottom: ${px(40)};
  `,
  CodeInputContent: styled.input.attrs({ type: 'text' })`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: ${px(20)};
    border: 0;
    font-size: ${px(21)};
    line-height: ${px(21)};
    background: transparent;
    resize: none;
    background: transparent;
    color: ${colorGray(9)};
    ::placeholder,
    ::-webkit-input-placeholder {
    color: ${colorGray(6)};
    }
  `,
  EnterButton: styled.button.attrs({ type: 'button' })`
    width: 15%;
    height: 100%;
    font-size: ${px(40)};
    text-align: center;
    cursor: pointer;
  `,
};
