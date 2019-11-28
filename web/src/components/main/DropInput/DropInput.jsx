import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { uploadFile } from '@/apis';
import createChannelId from '@/utils/uuid';
import { useCreateChannel } from '@/hooks';
import { LoadingModal, ErrorModal } from '@/components/common';
import createFormData from '@/utils/createFormdata';
import S from './style';
import {
  TEMP_ERROR_MESSAGE,
  CREATING_CHANNEL_MESSAGE,
} from '@/constants';

const ChannelCodeLength = 5;

const DropInput = () => {
  const { mutate, data } = useCreateChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleUpload = async (e) => {
    setIsLoading(true);
    const channelId = createChannelId();
    const channelCode = channelId.substring(0, ChannelCodeLength);
    const file = e.target.files[0];
    const formData = createFormData({ file, channelId });
    const {
      status,
      slideUrls,
      fileUrl,
    } = await uploadFile(formData);

    if (status === 'ok') {
      mutate({
        variables: {
          channelId,
          channelCode,
          slideUrls,
          fileUrl,
        },
      });
    } else {
      setIsError(true);
    }
  };

  if (data.status === 'ok') {
    return <Redirect to={`/channels/${data.channel.channelId}`} />;
  }

  return (
    <>
      <S.DropInputWrapper>
        <input
          id="upload-file"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
        <label htmlFor="upload-file">
          <Button variant="contained" component="span">
            <span>or 파일 업로드 </span>
            <span role="img" aria-label="upload-emoji">
              📂
            </span>
          </Button>
        </label>
      </S.DropInputWrapper>
      {isError && <ErrorModal message={TEMP_ERROR_MESSAGE} />}
      {isLoading && <LoadingModal message={CREATING_CHANNEL_MESSAGE} />}
    </>
  );
};

export default DropInput;
