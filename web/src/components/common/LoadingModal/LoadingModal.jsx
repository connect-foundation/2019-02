import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@/components/common';
import LoadingText from './LoadingText';
import S from './style';

const LoadingModal = (props) => {
  const { message } = props;

  return (
    <S.LoadingModalWrapper>
      <S.LoadingModal>
        <Spinner />
        <LoadingText message={message} />
      </S.LoadingModal>
    </S.LoadingModalWrapper>
  );
};

LoadingModal.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingModal;
