import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import S from './style';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';
import createChannelId from '@/utils/uuid';
import { uploadFile } from '@/apis';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';
import { LoadingModal, ErrorModal } from '@/components/common';

const DropZone = () => {
  const { mutate, data } = useCreateChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  if (data.status === 'ok') {
    return <Redirect to={`/channels/${data.channel.channelId}`} />;
  }

  return (
    <>
      {isError ? (
        <ErrorModal message="일시적인 오류입니다. 다시 시도해주세요." />
      ) : (
        <>
          {isLoading ? (<LoadingModal message="채널에 입장중" />) : (
            <S.DropZone
              onDrop={(event) => handleDrop(event)}
            >
              <S.DropZoneContent>
                <DropEmoji />
                <DropText />
                <DropInput />
              </S.DropZoneContent>
            </S.DropZone>
          )}
        </>
      )}
    </>
  );
};

export default DropZone;
