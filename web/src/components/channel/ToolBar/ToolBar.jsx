import React from 'react';
import S from './style';
import PenTool from './PenTool';
import { useChannelSelector } from '@/hooks';

const ToolBar = () => {
  const isToolBarActive = useChannelSelector((state) => state.isToolBarActive);

  return (
    <S.ToolBar>
      {isToolBarActive && (
      <S.ToolBarContent>
        <PenTool />
      </S.ToolBarContent>
      )}
    </S.ToolBar>
  );
};

export default ToolBar;
