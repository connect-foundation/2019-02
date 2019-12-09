import styled from 'styled-components';
import { px } from '@/styles';

export default {
  ChannelButton: styled.button.attrs({ type: 'button' })`
    width: 100%;
    height: ${px(56)};
    background: ${(({ theme }) => theme.palette.primary.main)};
    box-shadow: ${(({ theme }) => theme.palette.shadow.channelButton)};
    border-radius: 5px;
    color: white;
    font-size: ${px(21)};
    font-weight: bold;
    cursor: pointer;
  `,
};
