import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const DropText = (props) => {
  const { fontColor, message } = props;

  return (
    <S.DropText fontColor={fontColor}>
      {message}
    </S.DropText>
  );
};

DropText.propTypes = {
  fontColor: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default DropText;
