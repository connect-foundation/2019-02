import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { px, colorGray } from '@/styles';

export default {
  HistoryCard: styled(Card)`
    cursor: pointer;
    margin: ${px(50)} ${px(100)};
    width: ${px(749)};
    height: ${px(131)};
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
    margin: ${px(14)} ${px(21)} ${px(50)} 0;
    float: right;
  `,
  ChannelCode: styled.div`
    text-align: right;
    margin-top: ${px(40)};
    font-size: ${px(18)};
    color: ${colorGray(6)};
  `,
};
