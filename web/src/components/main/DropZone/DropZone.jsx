import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import S from './style';
import { uploadFile, subscribeProgress } from '@/apis';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';
import { LoadingModal, ErrorModal } from '@/components/common';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';
import getRandomItemOfList from '@/utils/random';
import createChannelId from '@/utils/uuid';
import {
  EMOJI_LIST,
  TEMP_ERROR_MESSAGE,
  CREATING_CHANNEL_MESSAGE,
} from '@/constants';

const ChannelCodeLength = 5;

const DropZone = () => {
  const { mutate, data } = useCreateChannel();
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dropZoneEmoji, setDropZoneEmoji] = useState('👇');
  const handleDrop = async (event) => {
    event.preventDefault();
    setLoadingMessage(CREATING_CHANNEL_MESSAGE);

    const channelId = createChannelId();
    const channelCode = channelId.substring(0, ChannelCodeLength);
    const { dataTransfer: { files } } = event;
    const file = files[0];
    const formData = createFormData({ file });
    const unsubscribeProgress = subscribeProgress(channelId, ({ message }) => {
      setLoadingMessage(message);
    });
    const {
      status,
      slideUrls,
      fileUrl,
    } = await uploadFile(channelId, formData);
    unsubscribeProgress();

    if (status === 'ok') {
      mutate({
        variables: {
          channelId,
          slideUrls,
          fileUrl,
          channelCode,
        },
      });
    } else {
      setIsError(true);
    }
  };
  const handleDragEnter = (event) => {
    event.preventDefault();

    setDragOver(true);
    setDropZoneEmoji(getRandomItemOfList(EMOJI_LIST));
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();

    setDragOver(false);
    setDropZoneEmoji('👇');
  };

  if (data) {
    return <Redirect to={`/channels/${data.channelId}`} />;
  }

  return (
    <>
      <S.DropModal>
        <S.DropModalContent>
          <DropEmoji emoji={dropZoneEmoji} />
          <DropText
            dragOver={dragOver}
          />
        </S.DropModalContent>
      </S.DropModal>
      <S.DropZone
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />
      <DropInput />
      {isError && <ErrorModal message={TEMP_ERROR_MESSAGE} />}
      {loadingMessage && <LoadingModal message={loadingMessage} />}
    </>
  );
};

export default DropZone;
