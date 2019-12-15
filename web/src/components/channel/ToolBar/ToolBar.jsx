import React from 'react';
import S from './style';
import PenTool from './PenTool';
import EraserTool from './EraserTool';
import { useChannelSelector } from '@/hooks';

const ToolBar = () => {
  const isToolBarActive = useChannelSelector((state) => state.isToolBarActive);

  return (
    <S.ToolBar>
      {isToolBarActive && (
      <S.ToolBarContent>
        <PenTool />
        <EraserTool />
      </S.ToolBarContent>
      )}
    </S.ToolBar>
  );
};

export default ToolBar;
