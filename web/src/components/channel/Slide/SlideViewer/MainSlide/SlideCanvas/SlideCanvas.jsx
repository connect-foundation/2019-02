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
  } = useChannelSelector((state) => state);
  const toolOption = {
    toolType: 'pen',
    toolStyleOption: {
      lineWidth: 2,
      lineCap: 'round',
      lineColor: 'red',
    },
  };
  const dropyCanvas = new DropyCanvas(canvasWidth, canvasHeight);

  dropyCanvas.init();

  useEffect(() => {
    if (canvas === null) {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    const context = canvas.getContext('2d');
    dropyCanvas.setContext(context);
    dropyCanvas.setTool(toolOption);
    dropyCanvas.addEventListener(canvas);

    return async () => {
      await dispatch({
        type: 'UPDATE_CANVAS_HISTORY',
        payload: {
          canvasHistory: [
            ...canvasHistory,
            ...dropyCanvas.getTempCanvasHistory(),
          ],
        },
      });
      dropyCanvas.removeEventListener(canvas);
    };
  }, [canvas, canvasWidth, canvasHeight]);

  useEffect(() => {
    if (canvas === null || canvasHistory === []) return;
    const context = canvas.getContext('2d');
    dropyCanvas.setTool(toolOption);
    dropyCanvas.reDrawContent(canvasHistory, context);
  }, [canvasHistory, canvasWidth, canvasHeight]);

  return (
    <S.CanvasWrapper>
      {dropyCanvas.render(canvasRef)}
    </S.CanvasWrapper>
  );
};

export default SlideCanvas;
