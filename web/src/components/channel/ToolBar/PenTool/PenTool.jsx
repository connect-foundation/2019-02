import React from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';
import {
  CHANNEL_REDUCER_PEN_TOOL_ACTIVE,
  CHANNEL_REDUCER_PEN_TOOL_INACTIVE,
} from '@/constants';

const PenTool = () => {
  const dispatch = useDispatch();
  const { isPenToolActive } = useChannelSelector((state) => state);
  const handleOnclick = () => {
    if (isPenToolActive) {
      dispatch({ type: CHANNEL_REDUCER_PEN_TOOL_INACTIVE });
    } else {
      dispatch({ type: CHANNEL_REDUCER_PEN_TOOL_ACTIVE });
    }
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

export default PenTool;
