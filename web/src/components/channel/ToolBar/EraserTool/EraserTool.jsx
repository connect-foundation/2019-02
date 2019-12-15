import React from 'react';
import S from './style';
import { useDispatch } from '@/hooks';

const EraserTool = () => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch({ type: 'ERASER_TOOL_ACTIVE' });
  };

  return (
    <S.EraserTool onClick={handleOnclick}>
      <S.EraserToolIcon />
    </S.EraserTool>
  );
};

export default EraserTool;
