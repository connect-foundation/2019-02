import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { px, colorGray } from '@/styles';


export default {
  UserHistory: styled.div`
    flex: 1 1 auto;
    background: ${colorGray(1)};
    position: relative;
    height: 100%;
    overflow: auto;
  `,
  UserHistoryContents: styled.div``,
  UserHistoryTitle: styled.div`
    margin: ${px(82)} ${px(100)};
    width: ${px(749)};
    color: ${colorGray(6)};
    text-align: left;
    font-size: ${px(36)};
    font-weight: normal;
    height: ${px(50)};
  `,
  Alert: styled(Card)`
    text-align: center;
    font-weight: bold;
    font-size: ${px(30)};
    padding: ${px(80)};
    cursor: pointer;
    margin: ${px(180)} ${px(100)};
    width: ${px(749)};
  `,
};
