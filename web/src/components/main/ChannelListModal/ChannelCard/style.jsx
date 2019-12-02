import styled from 'styled-components';
import { px, colorCommon, colorGray } from '@/styles';

export default {
  ChannelCard: styled.div`
  width: 100%;
  height: 25%;
  background: ${colorCommon('white')};
  box-shadow: ${px(0)} ${px(2)} ${px(19)} rgba(134, 142, 150, 0.4);
  border-radius: ${px(3)};
  margin-bottom: ${px(15)};
  padding: ${px(25)} ${px(24)} 0 ${px(24)};
  cursor: pointer;
  &:hover {
    box-shadow: ${px(0)} ${px(2)} ${px(19)} rgba(134, 142, 150, 0.7);
  }
  `,
  ChannelCardContent: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  ChannelName: styled.div`
    font-size: ${px(22)};
    margin-bottom: ${px(5)};
    color: ${colorGray(9)};
  `,
  ChannelInfo: styled.div`
  `,
  ChannelSubInfo: styled.div`
  `,
  ChannelCode: styled.div`
    font-size: ${px(15)};
    color: ${colorGray(7)};
    margin-top: ${px(45)};
    margin-left: ${px(75)}
  `,
};
