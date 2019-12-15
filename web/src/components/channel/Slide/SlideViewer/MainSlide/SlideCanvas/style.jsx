import styled from 'styled-components';

export default {
  CanvasWrapper: styled.div`
    position: absolute;
    z-index: ${(props) => (props.isPenToolActive ? 999 : 900)};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.isPenToolActive ? 'crosshair' : 'default')};
  `,
};
