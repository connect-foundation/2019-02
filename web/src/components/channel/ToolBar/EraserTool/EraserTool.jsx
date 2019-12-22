import React from 'react';
import S from './style';
import { CHANNEL_REDUCER_SET_ERASER_ACTIVE } from '@/constants';
import {
  useChannelSelector,
  useResetCanavsHistory,
  useDispatch,
} from '@/hooks';

const EraserTool = () => {
  const { channelId, page } = useChannelSelector((state) => state);
  const dispatch = useDispatch();
  const { mutate } = useResetCanavsHistory();
  const handleOnclick = () => {
    dispatch({ type: CHANNEL_REDUCER_SET_ERASER_ACTIVE });
    mutate({ variables: { channelId, page } });
  };

  return (
    <S.EraserTool onClick={handleOnclick}>
      <S.EraserToolIcon />
    </S.EraserTool>
  );
};

export default EraserTool;
