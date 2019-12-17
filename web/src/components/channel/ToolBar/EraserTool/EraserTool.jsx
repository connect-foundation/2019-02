import React from 'react';
import S from './style';
import { useChannelSelector } from '@/hooks';

const EraserTool = () => {
  const { slideCanvas } = useChannelSelector((state) => state);
  const handleOnclick = () => {
    slideCanvas.clearCanvas();
  };

  return (
    <S.EraserTool onClick={handleOnclick}>
      <S.EraserToolIcon />
    </S.EraserTool>
  );
};

export default EraserTool;
