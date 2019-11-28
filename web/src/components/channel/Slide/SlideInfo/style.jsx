import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  SlideInfo: styled.div`
    height: ${px(142)};
    width:94%;
    border-top: 1px solid ${colorGray(3)};
    padding: ${px(15)} 0 0 ${px(20)};
  `,
  TitleWrapper: styled.div`
    display: flex;
    align-items:center;
  `,
  ChannelTitle: styled.h1`
    font-size: ${px(24)};
    color: ${colorGray(7)};
    font-weight: 400;
    margin-right: ${px(20)};
  `,
  MasterName: styled.h3`
    font-size: ${px(18)};
    color: ${colorGray(7)};
    font-weight: 400;
  `,
};
