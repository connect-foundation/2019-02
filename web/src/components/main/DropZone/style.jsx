import styled from 'styled-components';
import { colorGray } from '@/styles';

export default {
  DropZoneWrapper: styled.div.attrs({ type: 'div' })`
    width: 100%;
    height: 100%;
    z-index: 990;
    position: fixed;
  `,
  DropZone: styled.div.attrs({ type: 'div' })`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colorGray(7)}E6;
  `,
  DropZoneContent: styled.div.attrs({ type: 'div' })`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 100%;
    margin-top:-64px;
  `,
};
