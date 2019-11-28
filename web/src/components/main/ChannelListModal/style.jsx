import styled from 'styled-components';
import { colorCommon } from '@/styles';

export default {
  ChannelListModal: styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
background-color: ${colorCommon('white')}BF;
    padding-top: 64px;
  `,
  ChannelListModalContent: styled.div`
    width: 65%;
    height: 100%;
    padding-top: 60px;
  `,
};
