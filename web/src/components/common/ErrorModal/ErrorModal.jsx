import React from 'react';
import PropTypes from 'prop-types';
import ErrorEmoji from './ErrorEmoji';
import ErrorText from './ErrorText';
import BackButton from './BackButton';
import S from './style';

const ErrorModal = (props) => {
  const { message } = props;

  return (
    <S.ErrorModal>
      <ErrorEmoji />
      <ErrorText message={message} />
      <BackButton />
    </S.ErrorModal>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
