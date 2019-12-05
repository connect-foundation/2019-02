import React, { useReducer } from 'react';
import S from './style';
import PenTool from './PenTool';
import { toolBarInitState, toolBarReducer } from '@/hooks';

const ToolBar = () => {
  const [toolBarState, toolBarDispatch] = useReducer(
    toolBarReducer,
    toolBarInitState,
  );

  return (
    <S.ToolBar>
      <PenTool
        isPenToolActive={toolBarState.isPenToolActive}
        toolBarDispatch={toolBarDispatch}
      />
    </S.ToolBar>
  );
};

export default ToolBar;
