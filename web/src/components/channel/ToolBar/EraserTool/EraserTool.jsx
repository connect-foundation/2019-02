import React from 'react';
import S from './style';
import { useChannelSelector } from '@/hooks';

const EraserTool = () => {
  const { dropyCanvas } = useChannelSelector((state) => state);
  const handleOnclick = () => {
    dropyCanvas.clearCanvas();
  };

  return (
    <S.EraserTool onClick={handleOnclick}>
      <S.EraserToolIcon />
    </S.EraserTool>
  );
};

export default EraserTool;
