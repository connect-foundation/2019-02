import styled from 'styled-components';
import { px, colorCommon } from '@/styles';

export default {
  ChannelCard: styled.div`
  width: 100%;
  height: 25%;
  background: ${colorCommon('white')};
  box-shadow: ${px(0)} ${px(2)} ${px(19)} rgba(134, 142, 150, 0.4);
  border-radius: 3px;
  margin-bottom: 15px;
  cursor: pointer;
  `,
};
