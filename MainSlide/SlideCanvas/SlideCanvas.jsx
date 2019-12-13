import React, { useRef, useEffect } from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';

const SlideCanvas = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const {
    canvasSize: {
      canvasWidth,
      canvasHeight,
    },
    canvasHistory,
  } = useChannelSelector((state) => state);
  const tempCanvasHistory = [];
  const prevPosition = { x: 0, y: 0 };
  const lineStyle = {
    lineWidth: 2,
    lineCap: 'round',
    strokeStyle: 'red',
  };
  const addCanvasHistory = (mousePositionX, mousePositionY) => {
    const ratioX = canvasWidth / mousePositionX;
    const ratioY = canvasHeight / mousePositionY;

    tempCanvasHistory.push([ratioX, ratioY]);
  };
  const setPosition = (x, y) => {
    prevPosition.x = x;
    prevPosition.y = y;
  };
  const handleMouseDown = (event) => {
    prevPosition.x = event.offsetX;
    prevPosition.y = event.offsetY;
  };
  const handleMouseMove = (event) => {
    if (event.buttons !== 1) return;
    const { lineWidth, lineCap, strokeStyle } = lineStyle;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = strokeStyle;

    ctx.moveTo(prevPosition.x, prevPosition.y);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    setPosition(event.offsetX, event.offsetY);
    addCanvasHistory(event.offsetX, event.offsetY);
  };
  const handleMouseUp = () => {
    tempCanvasHistory.push([]);
    dispatch({
      type: 'UPDATE_CANVAS_HISTORY',
      payload: { canvasHistory: [...canvasHistory, ...tempCanvasHistory] },
    });
  };

  useEffect(() => {
    if (canvas === null) {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
  }, [canvas, canvasWidth, canvasHeight]);

  const calculatePosition = (ratioX, ratioY) => {
    const currPositionX = canvasWidth / ratioX;
    const currPositionY = canvasHeight / ratioY;

    return { currPositionX, currPositionY };
  };

  const reDrawCanvasContent = () => {
    const ctx = canvasRef.current.getContext('2d');
    const newPosition = [];
    canvasHistory.forEach((history, index) => {
      const ratioX = history[0];
      const ratioY = history[1];
      const { currPositionX, currPositionY } = calculatePosition(ratioX, ratioY);

      newPosition.push([currPositionX, currPositionY]);

      if (index === 0) return;

      const { lineWidth, lineCap, strokeStyle } = lineStyle;
      const prevNewPosition = newPosition[index - 1];
      const prevNewPositionX = prevNewPosition[0];
      const prevNewPositionY = prevNewPosition[1];

      ctx.lineWidth = lineWidth;
      ctx.lineCap = lineCap;
      ctx.strokeStyle = strokeStyle;

      ctx.beginPath();
      ctx.moveTo(prevNewPositionX, prevNewPositionY);
      ctx.lineTo(currPositionX, currPositionY);
      ctx.stroke();
    });
  };

  useEffect(() => {
    if (canvas === null) return;

    reDrawCanvasContent();
  }, [canvasWidth, canvasHeight]);

  return (
    <S.Canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

export default SlideCanvas;
