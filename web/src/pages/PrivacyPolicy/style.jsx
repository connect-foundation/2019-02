import styled from 'styled-components';
import { px, colorGray } from '@/styles';

const S = {
  PrivacyPolicy: styled.div`
    box-sizing: border-box;
    max-width: ${px(440)};
    margin: 0 auto;
    height: 100%;
    padding: ${px(40)} 0;
  `,
  Inner: styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  `,
  Title: styled.strong`
    display: block;
    font-size: ${px(20)};
    line-height: ${px(24)};
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
