import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';

const SlideCanvas = (props) => {
  const { canvasWidth, canvasHeight } = props;
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const dispatch = useDispatch();
  const {
    isEraserToolActive,
    isPenToolActive,
    dropyCanvas,
  } = useChannelSelector((state) => state);

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    dropyCanvas.clearCanvas(context);
  }, [isEraserToolActive]);

  useEffect(() => {
    if (canvas === null) {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    if (isPenToolActive) {
      const context = canvas.getContext('2d');
      dropyCanvas.setContext(context);
      dropyCanvas.addEventListener(canvas);
    }

    return () => {
      dispatch({ type: 'ERASER_TOOL_INACTIVE' });
      dropyCanvas.removeEventListener(canvas);
    };
  }, [canvas, canvasWidth, canvasHeight, isPenToolActive]);

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    dropyCanvas.reDrawContent(context);
  }, [canvas, canvasWidth, canvasHeight]);

  return (
    <S.CanvasWrapper isPenToolActive={isPenToolActive}>
      {dropyCanvas.render(canvasRef)}
    </S.CanvasWrapper>
  );
};

SlideCanvas.propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
};

export default SlideCanvas;
