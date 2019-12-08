import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const PenTool = (props) => {
  const { isPenToolActive, toolBarDispatch } = props;
  const handleOnclick = () => {
    toolBarDispatch({ type: 'penToolActive' });
  };

  return (
    <S.PenTool onClick={handleOnclick}>
      <S.PenToolIcon isPenToolActive={isPenToolActive} />
    </S.PenTool>
  );
};

PenTool.propTypes = {
  isPenToolActive: PropTypes.bool.isRequired,
  toolBarDispatch: PropTypes.func.isRequired,
};

export default PenTool;
