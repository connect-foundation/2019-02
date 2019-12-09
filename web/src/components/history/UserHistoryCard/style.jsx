import styled from 'styled-components';
import { Card } from '@material-ui/core';
import Profile from '@@/icon_bird_870x818.png';
import { px, colorGray } from '@/styles';

export default {
  HistoryCard: styled(Card)`
    cursor: pointer;
    margin: ${px(50)} ${px(100)};
    min-width: ${px(700)};
  `,
  HistoryCardLeftDetail: styled.div`
    margin: ${px(50)} 0 ${px(50)} ${px(50)};
    float: left;
  `,
  HistoryCardMiddleDetail: styled.div`
    margin: ${px(50)} 0;
    float: right;
  `,
  HistoryCardRightDetail: styled.div`
    margin: ${px(50)} ${px(50)} ${px(50)} 0;
    float: right;
  `,
  Profile: styled.div`
    width: ${px(80)};
    height: ${px(80)};
    border-radius: 100%;
    border: ${px(1)} solid ${colorGray(4)}; 
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: ${px(10)};
  `,
};
