import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  Emoji: styled.div`
    font-size: ${px(160)};
    text-align: center;  
    animation:fingerAni 2s infinite;
    @keyframes fingerAni
    {
      0%{transform:translateY(${px(10)});}
      50%{transform:translateY(${px(-20)});}
      100%{transform:translateY(${px(10)});}
    }
  `,
};
