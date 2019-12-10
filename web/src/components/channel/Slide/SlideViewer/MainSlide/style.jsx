import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  MainSlide: styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: ${px(35)} 0;
  `,
  SlideWrapper: styled.div`
    width:100%;
    height:100%;
    position:relative;
  `,
  SlideImg: styled.img`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    user-select: none;
    border-radius: 3px;
    box-shadow: 10px 2px 20px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
  `,
  Canvas: styled.canvas`
    position: absolute;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
