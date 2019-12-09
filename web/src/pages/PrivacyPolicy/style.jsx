import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  PrivacyPolicy: styled.div`
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    background-color: #fff;
  `,
  Inner: styled.div`
    max-width: ${px(600)};
    margin: ${px(100)} auto;
    padding: 0 ${px(20)};
  `,
  Title: styled.strong`
    display: block;
    font-size: ${px(20)};
    line-height: ${px(24)};
    color: ${colorYellow(9)}
  `,
  Content: styled.p`
    margin: ${px(20)} 0;
    font-size: ${px(15)};
    line-height: ${px(21)};
    white-space: pre-wrap;
    color: ${colorGray(8)};
  `,
};

export default S;
