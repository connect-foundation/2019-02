import React, { useRef, useEffect } from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';
import DropyCanvas from '@/utils/DropyCanvas';

const SlideCanvas = () => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const dispatch = useDispatch();
  const {
    canvasSize: {
      canvasWidth,
      canvasHeight,
    },
    canvasHistory,
    toolOption,
    isEraserToolActive,
    isPenToolActive,
  } = useChannelSelector((state) => state);
  const dropyCanvas = new DropyCanvas(canvasWidth, canvasHeight);

  dropyCanvas.init();

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    dropyCanvas.resetTempCanvasHistory();

    dispatch({
      type: 'RESET_CANVAS_HISTORY',
      payload: {
        canvasHistory: [],
      },
    });
  }, [isEraserToolActive]);

  useEffect(() => {
    if (canvas === null) {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    if (isPenToolActive) {
      const context = canvas.getContext('2d');
      dropyCanvas.setContext(context);
      dropyCanvas.setTool(toolOption);
      dropyCanvas.addEventListener(canvas);
    }

    return () => {
      if (!isEraserToolActive) {
        dispatch({
          type: 'UPDATE_CANVAS_HISTORY',
          payload: {
            canvasHistory: [
              ...canvasHistory,
              ...dropyCanvas.getTempCanvasHistory(),
            ],
          },
        });
      }
      dispatch({ type: 'ERASER_TOOL_INACTIVE' });
      dropyCanvas.removeEventListener(canvas);
    };
  }, [canvas, canvasWidth, canvasHeight, isEraserToolActive, isPenToolActive]);

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    dropyCanvas.setTool(toolOption);
    dropyCanvas.reDrawContent(canvasHistory, context);
  }, [canvasHistory, canvasWidth, canvasHeight, canvas]);

  return (
    <S.CanvasWrapper isPenToolActive={isPenToolActive}>
      {dropyCanvas.render(canvasRef)}
    </S.CanvasWrapper>
  );
};

export default SlideCanvas;
