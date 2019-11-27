import styled from 'styled-components';
import { px } from '@/styles';

const S = {
  ChatLogsWrapper: styled.div`
    flex: 1 1 auto;
    position:relative;
  `,
  ScrollWrap: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 ${px(20)};
  `,
  Scroller: styled.ul`
    margin: ${px(14)} 0;
  `,
  ChatLog: styled.li`
    & + & {
      margin-top: ${px(9)};
    }
  `,
};

export default S;
