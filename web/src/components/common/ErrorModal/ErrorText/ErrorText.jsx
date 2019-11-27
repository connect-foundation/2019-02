import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const ErrorText = (props) => {
  const { message } = props;

  return (
    <>
      <S.ErrorTitle>Oops!</S.ErrorTitle>
      <S.ErrorText>
        {message}
      </S.ErrorText>
    </>
  );
};

ErrorText.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorText;
