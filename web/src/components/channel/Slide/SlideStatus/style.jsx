import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';
import { SLIDE_STATUS_HEIGHT } from '@/constants';

export default {
  SlideStatus: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 94%;
    height: ${px(SLIDE_STATUS_HEIGHT)};
    margin: 0 auto;
    border-bottom: 1px solid ${colorGray(3)};
  `,
  Wrapper: styled.div`
   button {
      margin-left: 10px;
   }
  `,
};
