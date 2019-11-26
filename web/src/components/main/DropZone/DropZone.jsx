import React from 'react';
import { Redirect } from 'react-router-dom';
import S from './style';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';
import createChannelId from '@/utils/uuid';
import { uploadFile } from '@/apis';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';

const DropZone = () => {
  const { mutate, data } = useCreateChannel();
  const handleDrop = async (event) => {
    event.preventDefault();

    const channelId = createChannelId();
    const { dataTransfer: { files } } = event;
    const file = files[0];
    const formData = createFormData({ channelId, file });
    const status = await uploadFile(formData);

    if (status === 'ok') {
      mutate({ variables: { channelId } });
    } else {
      // Todo: errer
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  if (data.status === 'ok') {
    return <Redirect to={`/channels/${data.channel.channelId}`} />;
  }

  return (
    <S.DropZone
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragLeave={(event) => handleDragLeave(event)}
    >
      <S.DropZoneContent>
        <DropEmoji />
        <DropText />
        <DropInput />
      </S.DropZoneContent>
    </S.DropZone>
  );
};

export default DropZone;
