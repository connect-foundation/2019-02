import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import S from './style';
import { uploadFile, subscribeProgress } from '@/apis';
import {
  useCreateChannel,
  dropZoneInitState,
  dropZoneReducer,
} from '@/hooks';
import createFormData from '@/utils/createFormdata';
import { LoadingModal, ErrorModal } from '@/components/common';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';
import getRandomItemOfList from '@/utils/random';
import createChannelId from '@/utils/uuid';
import checkFileTypeValidation from '@/utils/file';
import {
  EMOJI_LIST,
  TEMP_ERROR_MESSAGE,
  CREATING_CHANNEL_MESSAGE,
  FILE_TYPE_VALIDATION_ERROR_MESSAGE,
} from '@/constants';

const ChannelCodeLength = 5;
const DefaultDropEmoji = '👇';

const DropZone = () => {
  const { mutate, data } = useCreateChannel();
  const [dropZoneState, dropZoneDispatch] = useReducer(
    dropZoneReducer,
    dropZoneInitState,
  );
  const {
    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    dropZoneEmoji,
    isDragOver,
  } = dropZoneState;
  const handleDrop = async (event) => {
    event.preventDefault();

    const channelId = createChannelId();
    const channelCode = channelId.substring(0, ChannelCodeLength);
    const { dataTransfer: { files } } = event;
    const file = files[0];

    if (checkFileTypeValidation(file)) {
      dropZoneDispatch({ type: 'setLoadingModal', payload: CREATING_CHANNEL_MESSAGE });
      const formData = createFormData({ file });
      const unsubscribeProgress = subscribeProgress(channelId, ({ message }) => {
        dropZoneDispatch({ type: 'setLoadingModal', payload: message });
      });
      const {
        status,
        slideUrls,
        fileUrl,
        slideRatioList,
      } = await uploadFile(channelId, formData);
      unsubscribeProgress();

      if (status === 'ok') {
        mutate({
          variables: {
            channelId,
            slideUrls,
            fileUrl,
            channelCode,
            slideRatioList,
          },
        });
      } else {
        dropZoneDispatch({ type: 'setErrorModal', payload: TEMP_ERROR_MESSAGE });
      }
    } else {
      dropZoneDispatch({ type: 'setErrorModal', payload: FILE_TYPE_VALIDATION_ERROR_MESSAGE });
    }
  };
  const handleDragEnter = (event) => {
    event.preventDefault();

    dropZoneDispatch({ type: 'setDragOver' });
    dropZoneDispatch({ type: 'setDropZoneEmoji', payload: getRandomItemOfList(EMOJI_LIST) });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();

    dropZoneDispatch({ type: 'setDragOver' });
    dropZoneDispatch({ type: 'setDropZoneEmoji', payload: DefaultDropEmoji });
  };

  if (data) {
    return <Redirect to={`/channels/${data.channelId}`} />;
  }

  return (
    <>
      <S.DropModal>
        <S.DropModalContent>
          <DropEmoji emoji={dropZoneEmoji} />
          <DropText dragOver={isDragOver} />
        </S.DropModalContent>
      </S.DropModal>
      <S.DropZone
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />
      <DropInput
        dropZoneDispatch={dropZoneDispatch}
      />
      {isError && <ErrorModal message={errorMessage} />}
      {isLoading && <LoadingModal message={loadingMessage} />}
    </>
  );
};

export default DropZone;
