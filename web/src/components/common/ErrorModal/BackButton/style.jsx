import styled from 'styled-components';
import { px, colorGray } from '@/styles/themeUtil';

export default {
  BackButton: styled.div`
    width: ${px(200)};
    height: ${px(60)};
    margin-top: ${px(10)};
    padding-top: ${px(15)};
    color: ${colorGray(6)};
    font-size: ${px(21)};
    text-align: center;
    cursor: pointer;
    font-size: ${px(18)};
  `,
};
