import React, { useReducer } from 'react';
import S from './style';
import { dropModalInitState, dropModalReducer } from '@/hooks';
import { LoadingModal, ErrorModal } from '@/components/common';
import {
  DropEmoji,
  DropText,
  DropInput,
  DropZone,
  DropCloseButton,
} from '@/components/main';

const DropModal = () => {
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
        <DropCloseButton dropModalDispatch={dropModalDispatch} />
        <S.DropModalContent>
          <DropEmoji emoji={dropModalEmoji} />
          <DropText dragOver={isDragOver} />
        </S.DropModalContent>
      </S.DropModal>
      <DropZone dropModalDispatch={dropModalDispatch} />
      <DropInput
        dropModalDispatch={dropModalDispatch}
      />
      {isError && <ErrorModal message={errorMessage} />}
      {isLoading && <LoadingModal message={loadingMessage} />}
    </>
  );
};

export default DropModal;
