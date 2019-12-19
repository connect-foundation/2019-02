import React from 'react';
import S from './style';
import {
  useChannelSelector,
  useResetCanavsHistory,
} from '@/hooks';

const EraserTool = () => {
  const {
    slideCanvas,
    channelId,
    page,
  } = useChannelSelector((state) => state);
  const { mutate } = useResetCanavsHistory();
  const handleOnclick = () => {
    slideCanvas.clearCanvas();
    mutate({ variables: { channelId, page } });
  };

  return (
    <S.EraserTool onClick={handleOnclick}>
      <S.EraserToolIcon />
    </S.EraserTool>
  );
};

export default EraserTool;
