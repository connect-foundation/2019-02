import styled from 'styled-components';
import { px, colorGray } from '@/styles';

export default {
  HistoryCard: styled.div`
    cursor: pointer;
    background: white;
    margin: ${px(25)} ${px(100)};
    width: ${px(749)};
    height: ${px(131)};
    box-shadow: ${px(0)} ${px(2)} ${px(9)} rgba(0, 0, 0, 0.03);
    border-radius: ${px(3)};
  `,
  HistoryCardLeftDetail: styled.div`
    margin: ${px(34)} 0 ${px(50)} ${px(40)};
    float: left;
  `,
  HistoryCardMiddleDetail: styled.div`
    margin: ${px(50)} 0;
    float: right;
  `,
  HistoryCardRightDetail: styled.div`
    margin: ${px(14)} ${px(21)} ${px(20)} 0;
    float: right;
  `,
  ChannelCode: styled.div`
    text-align: right;
    margin-top: ${px(40)};
    font-size: ${px(18)};
    color: ${colorGray(6)};
  `,
};
