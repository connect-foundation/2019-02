import React from 'react';
import S from './style';
import PenTool from './PenTool';
import EraserTool from './EraserTool';
import { useChannelSelector } from '@/hooks';

const ToolBar = () => {
  const isToolBarActive = useChannelSelector((state) => state.isToolBarActive);

  if (!isToolBarActive) return null;

  return (
    <S.ToolBar>
      <S.ToolBarContent>
        <PenTool />
        <EraserTool />
      </S.ToolBarContent>
    </S.ToolBar>
  );
};

export default ToolBar;
