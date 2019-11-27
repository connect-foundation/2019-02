import styled from 'styled-components';
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
};
