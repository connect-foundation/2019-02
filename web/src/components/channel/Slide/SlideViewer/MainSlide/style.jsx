import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  MainSlide: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${px(50)} 0;
  `,
  SlideImg: styled.img`
    user-select: none;
    height:auto;
    width:auto;
    max-width: 100%;
    border-radius:3px;
    max-height: 100%;
    object-fit: contain;
    background-color: ${({ theme }) => theme.palette.common.white};
    box-shadow: ${({ theme }) => theme.palette.shadow.slide};
  `,
};
