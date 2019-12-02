import styled from 'styled-components';
import { px } from '@/styles';

const S = {
  ChatLogs: styled.div`
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
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0px; /* For Chrome, Safari, and Opera */
    }
  `,
};

export default S;
