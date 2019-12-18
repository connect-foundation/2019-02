import React from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';

const PenTool = () => {
  const dispatch = useDispatch();
  const { isPenToolActive } = useChannelSelector((state) => state);
  const penToolOption = {
    lineWidth: 2,
    lineCap: 'round',
    lineColor: 'red',
  };
  const handleOnclick = () => {
    if (isPenToolActive) {
      dispatch({ type: 'PEN_TOOL_INACTIVE' });
    } else {
      dispatch({
        type: 'PEN_TOOL_ACTIVE',
        payload: { toolOptions: penToolOption },
      });
    }
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

export default PenTool;
