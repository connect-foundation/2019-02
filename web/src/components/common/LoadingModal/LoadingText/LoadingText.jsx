import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const LoadingText = (props) => {
  const { message } = props;

  return (
    <S.LoadingText>
      {message}
    </S.LoadingText>
  );
};

LoadingText.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingText;
