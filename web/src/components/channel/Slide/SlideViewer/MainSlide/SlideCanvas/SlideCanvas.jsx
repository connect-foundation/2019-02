import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import S from './style';
import { useChannelSelector } from '@/hooks';

const SlideCanvas = (_, ref) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const {
    canvasSize: {
      canvasWidth,
      canvasHeight,
    },
    storedCanvasUrl,
  } = useChannelSelector((state) => state);
  const prevPosition = { x: 0, y: 0 };
  const lineStyle = {
    lineWidth: 3,
    lineCap: 'round',
    strokeStyle: 'red',
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
  };

  useEffect(() => {
    if (canvas === null) {
      window.dispatchEvent(new Event('resize'));
      return;
    }
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
  }, [canvas]);

  useEffect(() => {
    if (canvas === null) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = storedCanvasUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
    };
  }, [canvasWidth, canvasHeight]);

  useImperativeHandle(ref, () => canvasRef.current);

  return (
    <S.Canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

export default forwardRef(SlideCanvas);
