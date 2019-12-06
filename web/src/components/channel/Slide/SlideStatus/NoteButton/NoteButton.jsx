import React from 'react';
import PropTypes from 'prop-types';
import { SmallButton } from '@/components/common';

const NoteButton = (props) => {
  const { toolBarDispatch } = props;
  const handleOnClick = () => {
    toolBarDispatch({ type: 'toolBarActive' });
  };

  return (
    <SmallButton onClick={handleOnClick}>
      <span aria-label="pencil" role="img">✏️</span>
      <span>필기도구</span>
    </SmallButton>
  );
};

NoteButton.propTypes = {
  toolBarDispatch: PropTypes.func.isRequired,
};

export default NoteButton;
