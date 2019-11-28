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
  `,
  UserHistoryTitle: styled(Card)`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    height: ${px(50)};
    padding: ${px(14)};
    margin-top: ${px(26)};
    min-width: ${px(700)};
  `,
};
