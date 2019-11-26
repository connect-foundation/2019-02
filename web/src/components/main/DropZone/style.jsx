import styled from 'styled-components';
import { colorGray } from '@/styles';

export default {
  DropZone: styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colorGray(7)}E6;
  `,
  DropZoneContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 100%;
    margin-top:-64px;
  `,
};
