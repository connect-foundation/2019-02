import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { dropModalInitState, dropModalReducer } from '@/reducers';
import { LoadingModal, ErrorModal } from '@/components/common';
import {
  DropEmoji,
  DropText,
  DropInput,
  DropZone,
  DropModalCloseButton,
} from '@/components/main';

const DropModal = (props) => {
  const { setShowDropModal } = props;
  const [dropModalState, dropModalDispatch] = useReducer(
    dropModalReducer,
    dropModalInitState,
  );
  const {
    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    dropModalEmoji,
    isDragOver,
  } = dropModalState;

  return (
    <>
      <S.DropModal>
        <S.DropModalContent>
          <DropEmoji emoji={dropModalEmoji} />
          <DropText dragOver={isDragOver} />
          <DropInput dropModalDispatch={dropModalDispatch} />
        </S.DropModalContent>
        <DropZone dropModalDispatch={dropModalDispatch} />
        <DropModalCloseButton setShowDropModal={setShowDropModal} />
      </S.DropModal>
      {isError && <ErrorModal message={errorMessage} />}
      {isLoading && <LoadingModal message={loadingMessage} />}
    </>
  );
};

DropModal.propTypes = {
  setShowDropModal: PropTypes.func.isRequired,
};

export default DropModal;
