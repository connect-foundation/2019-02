import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  SlideStatus: styled.div`
    height: ${px(76)};
    width: 94%;
    border-bottom: 1px solid ${colorGray(3)};
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Wrapper: styled.div`
   button{
      margin-left:10px;
   }
  `,
};
