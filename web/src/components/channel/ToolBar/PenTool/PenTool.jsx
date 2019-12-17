import React from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';

const PenTool = () => {
  const dispatch = useDispatch();
  const {
    isPenToolActive,
    dropyCanvas,
  } = useChannelSelector((state) => state);
  const penToolOption = {
    toolType: 'pen',
    toolStyleOption: {
      lineWidth: 2,
      lineCap: 'round',
      lineColor: 'red',
    },
  };
  const handleOnclick = () => {
    dropyCanvas.setToolStyle(penToolOption);
    dispatch({ type: 'PEN_TOOL_ACTIVE' });
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

export default PenTool;
