import styled from 'styled-components';
import { px, colorCommon } from '@/styles';

export default {
  ChannelListModal: styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colorCommon('white')}BF;
    padding-top: ${px(64)};
  `,
  ChannelListModalContent: styled.div`
    width:60%;
    height: 100%;
    padding-top: ${px(60)};
  `,
};
