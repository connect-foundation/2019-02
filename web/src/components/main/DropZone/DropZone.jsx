import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import S from './style';
import { uploadFile } from '@/apis';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';
import { LoadingModal, ErrorModal } from '@/components/common';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';
import getRandomItemOfList from '@/utils/random';
import createChannelId from '@/utils/uuid';

const DropZone = () => {
  const { mutate, data } = useCreateChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dropZoneTextColor, setDropZoneTextColor] = useState('default');
  const [dropZoneMessage, setDropZoneMessage] = useState('Drag & Drop');
  const [dropZoneEmoji, setDropZoneEmoji] = useState('👇');

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const channelId = createChannelId();
    const { dataTransfer: { files } } = event;
    const file = files[0];
    const formData = createFormData({ channelId, file });
    const status = await uploadFile(formData);

    if (status === 'ok') {
      mutate({ variables: { channelId } });
    } else {
      setIsError(true);
    }
  };
  const handleDragEnter = (event) => {
    event.preventDefault();

    const emojiList = ['😀', '😃', '🤣', '😍', '😘', '🥳', '😻', '😽', '😇', '🦄', '🤓', '😎', '🤩'];

    setDropZoneTextColor('drag');
    setDropZoneMessage('Start Speech!');
    setDropZoneEmoji(getRandomItemOfList(emojiList));
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();

    setDropZoneTextColor('default');
    setDropZoneMessage('Drag & Drop');
    setDropZoneEmoji('👇');
  };

  if (data.status === 'ok') {
    return <Redirect to={`/channels/${data.channel.channelId}`} />;
  }

  return (
    <>
      <S.DropZone>
        <S.DropZoneContent>
          <DropEmoji emoji={dropZoneEmoji} />
          <DropText
            fontColor={dropZoneTextColor}
            message={dropZoneMessage}
          />
        </S.DropZoneContent>
      </S.DropZone>
      <S.DropZoneWrapper
        onDrop={(event) => handleDrop(event)}
        onDragEnter={(event) => handleDragEnter(event)}
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={(event) => handleDragLeave(event)}
      />
      <DropInput />
      {isError && <ErrorModal message="일시적인 오류입니다. 다시 시도해주세요." />}
      {isLoading && <LoadingModal message="채널에 생성중" />}
    </>
  );
};

export default DropZone;
