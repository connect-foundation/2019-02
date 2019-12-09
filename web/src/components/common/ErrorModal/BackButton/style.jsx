import styled from 'styled-components';
import { px, colorGray, colorPrimary } from '@/styles/themeUtil';

export default {
  BackButton: styled.div`
    width: ${px(100)};
    height: ${px(50)};
    margin-top: ${px(10)};
    padding-top: ${px(10)};
    color: ${colorGray(6)};
    font-size: ${px(21)};
    text-align: center;
    cursor: pointer;
    font-size: ${px(18)};
    &:hover {
      text-decoration: underline;
      color: ${colorPrimary('main')};
    }
  `,
};
