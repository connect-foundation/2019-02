import styled from 'styled-components';
import { Card } from '@material-ui/core';
import Profile from '@@/tempProfile.png';
import { px, colorGray } from '@/styles';

export default {
  HistoryCardWrapper: styled.div`
    /* height: ${px(200)};
    border: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])}; */
    /* margin: 50px 50px; */
  `,
  HistoryCard: styled(Card)`
    margin: 50px 100px;
    min-width: 600px;
  `,
  HistoryCardLeftDetail: styled.div`
    margin: 50px 0 50px 50px;
    float: left;
  `,
  HistoryCardMiddleDetail: styled.div`
    margin: 50px 0;
    float: right;
  `,
  HistoryCardRightDetail: styled.div`
    margin: 50px 50px 50px 0;
    float: right;
  `,
  OnAir: styled.div`
    width: 200px
  `,
  Profile: styled.div`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])}; 
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: 10px;
  `,
};
