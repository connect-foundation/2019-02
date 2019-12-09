import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { px } from '@/styles';


export default {
  UserHistory: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: auto;
  `,
  UserHistoryContents: styled.div`
    position: absolute;
    width: 100%;
    padding-top: ${px(50)};
  `,
  UserHistoryTitle: styled(Card)`
    margin: ${px(20)} ${px(100)};
    min-width: ${px(700)};
    text-align: center;
    font-weight: bold;
    height: ${px(50)};
    padding: ${px(14)};
  `,
  Alert: styled(Card)`
    text-align: center;
    font-weight: bold;
    font-size: ${px(30)};
    padding: ${px(80)};
    cursor: pointer;
    margin: ${px(50)} ${px(100)};
    min-width: ${px(700)};
  `,
};
