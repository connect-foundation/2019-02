import React from 'react';
import S from './style';
import { useDispatch, useChannelSelector } from '@/hooks';

const PenTool = () => {
  const dispatch = useDispatch();
  const isPenToolActive = useChannelSelector((state) => state.isPenToolActive);
  const penToolOption = {
    toolType: 'pen',
    toolStyleOption: {
      lineWidth: 2,
      lineCap: 'round',
      lineColor: 'red',
    },
  };
  const handleOnclick = () => {
    dispatch({
      type: 'PEN_TOOL_ACTIVE',
      payload: {
        toolOption: penToolOption,
      },
    });
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

export default PenTool;
