import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const DropText = (props) => {
  const { dragOver } = props;

  return (
    <S.DropText dragOver={dragOver}>
      {dragOver ? ('Start Speech!') : ('Drag & Drop!')}
    </S.DropText>
  );
};

DropText.propTypes = {
  dragOver: PropTypes.bool.isRequired,
};

export default DropText;
