import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { px, colorGray } from '@/styles';


export default {
  UserHistory: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: auto;
    border-left: ${px(1)} solid${colorGray(3)};
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
};
