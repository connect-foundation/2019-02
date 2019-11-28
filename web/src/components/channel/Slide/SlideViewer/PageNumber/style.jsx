import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  PageNumber: styled.div`
    font-size: ${px(14)};
    color: ${colorGray(6)};
    position: absolute;
    bottom: ${px(10)};
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
  `,
};
