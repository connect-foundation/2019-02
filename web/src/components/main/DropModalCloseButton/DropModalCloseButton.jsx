import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const DropModalCloseButton = (props) => {
  const { setShowDropModal } = props;
  const handleOnClick = () => {
    setShowDropModal(false);
  };

  return (
    <S.DropCloseButton onClick={handleOnClick}>
      <S.CloseIcon />
    </S.DropCloseButton>
  );
};

DropModalCloseButton.propTypes = {
  setShowDropModal: PropTypes.func.isRequired,
};

export default DropModalCloseButton;
