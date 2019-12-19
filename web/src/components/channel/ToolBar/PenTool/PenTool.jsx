import React from 'react';
import S from './style';
import { useChannelSelector, useDispatch } from '@/hooks';
import {
  DEFAULT_PEN_TOOL_LINE_WIDTH,
  DEFAULT_PEN_TOOL_LINE_COLOR,
  DEFAULT_PEN_TOOL_LINE_CAP,
  CHANNEL_REDUCER_PEN_TOOL_ACTIVE,
  CHANNEL_REDUCER_PEN_TOOL_INACTIVE,
} from '@/constants';

const PenTool = () => {
  const dispatch = useDispatch();
  const { isPenToolActive } = useChannelSelector((state) => state);
  const penToolOption = {
    lineWidth: DEFAULT_PEN_TOOL_LINE_WIDTH,
    lineCap: DEFAULT_PEN_TOOL_LINE_CAP,
    lineColor: DEFAULT_PEN_TOOL_LINE_COLOR,
  };
  const handleOnclick = () => {
    if (isPenToolActive) {
      dispatch({ type: CHANNEL_REDUCER_PEN_TOOL_INACTIVE });
    } else {
      dispatch({
        type: CHANNEL_REDUCER_PEN_TOOL_ACTIVE,
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
