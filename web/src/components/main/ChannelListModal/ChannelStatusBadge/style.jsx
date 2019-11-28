import styled from 'styled-components';
import { px, colorPrimary, colorGray } from '@/styles';

export default {
  ChannelStatusBadge: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${px(10)} 0 ${px(10)};
    font-size: ${px(18)};
    width: ${px(180)};
    height: ${px(30)};
    box-shadow: ${px(0)} ${px(2)} ${px(9)} rgba(0, 0, 0, 0.12);
    border-radius: ${px(2)};
    color: white;
    background: ${(props) => (
    props.channelStatus === 'on'
      ? colorPrimary('main') : colorGray(5))}
  `,
};
