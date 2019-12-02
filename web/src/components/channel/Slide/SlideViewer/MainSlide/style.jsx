import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  MainSlide: styled.div`
    display: inline-block;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    height:auto;
    width:auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: ${px(3)};
    background-color: ${({ theme }) => theme.palette.common.white};
    box-shadow: ${({ theme }) => theme.palette.shadow.slide};
  `,
};
