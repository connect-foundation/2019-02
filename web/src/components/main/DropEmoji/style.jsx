import styled from 'styled-components';
import { px } from '@/styles/themeUtil';

export default {
  Emoji: styled.div`
    margin-top: 64px;
    font-size: ${px(180)};
    text-align: center;  
    animation:fingerAni 2s infinite;
    @keyframes fingerAni
    {
      0%{transform:translateY(10px);}
      50%{transform:translateY(-20px);}
      100%{transform:translateY(10px);}
    }
  `,
};
