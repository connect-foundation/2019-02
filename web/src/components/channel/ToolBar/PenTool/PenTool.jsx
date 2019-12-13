import React from 'react';
import S from './style';
import { useDispatch, useChannelSelector } from '@/hooks';

const PenTool = () => {
  const dispatch = useDispatch();
  const isPenToolActive = useChannelSelector((state) => state.isPenToolActive);
  const handleOnclick = () => {
    dispatch({ type: 'PEN_TOOL_ACTIVE' });
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

export default PenTool;
