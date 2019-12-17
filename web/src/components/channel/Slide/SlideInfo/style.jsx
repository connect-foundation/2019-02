import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  SlideInfo: styled.div`
    display: flex;
    flex-direction: row;
    height: ${px(142)};
    width: 94%;
    border-top: 1px solid ${colorGray(3)};
    padding: ${px(15)} 0 0 ${px(20)};
  `,
  ChannelSummaryWrapper: styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
  `,
  TitleWrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  ChannelTitle: styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${px(24)};
    color: ${colorGray(7)};
    font-weight: 400;
    margin-right: ${px(20)};
    align-items: center;
    height: ${px(32)};
  `,
  MasterName: styled.h3`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${px(18)};
    color: ${colorGray(7)};
    font-weight: 400;
    height: ${px(32)};
  `,
  PeopleWrapper: styled.div`
    margin-top: ${px(4)};
  `,
  PeopleLogo: styled.img`
    vertical-align: middle;
    margin-right: ${px(4)};
  `,
  SlideButtonsWrapper: styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 50%;
    button {
      margin-left: 10px;
   }
  `,
};
