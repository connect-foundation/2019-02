import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@/components/common';
import LoadingText from './LoadingText';
import S from './style';

const LoadingModal = (props) => {
  const { message } = props;

  return (
    <S.LoadingModal>
      <S.LoadingModalContent>
        <Spinner />
        <LoadingText message={message} />
      </S.LoadingModalContent>
    </S.LoadingModal>
  );
};

LoadingModal.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingModal;
