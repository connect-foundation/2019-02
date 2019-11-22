import styled from 'styled-components';
import { px } from '@/styles';

export default {
  ChannelButton: styled.button`
    width:100%;
    height: 56px;
    background: ${(({ theme }) => theme.palette.primary.main)};
    box-shadow: ${(({ theme }) => theme.palette.shadow.channelButton)};
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: ${px(21)};
    font-weight: bold;
  `,
};
