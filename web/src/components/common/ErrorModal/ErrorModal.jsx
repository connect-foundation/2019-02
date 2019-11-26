import React from 'react';
import PropTypes from 'prop-types';
import ErrorEmoji from './ErrorEmoji';
import ErrorText from './ErrorText';
import S from './style';

const ErrorModal = (props) => {
  const { message } = props;

  return (
    <S.ErrorModalWrapper>
      <S.ErrorModal>
        <ErrorEmoji />
        <ErrorText message={message} />
      </S.ErrorModal>
    </S.ErrorModalWrapper>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
