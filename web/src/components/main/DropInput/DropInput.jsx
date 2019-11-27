import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { uploadFile } from '@/apis';
import createChannelId from '@/utils/uuid';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';

const DropInput = () => {
  const { mutate, data } = useCreateChannel();
  const handleUpload = async (e) => {
    const channelId = createChannelId();
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
          slideUrls,
          fileUrl,
        },
      });
    } else {
      // Todo: error
    }
  };

  if (data.status === 'ok') {
    return <Redirect to={`/channels/${data.channel.channelId}`} />;
  }

  return (
    <>
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
    </>
  );
};

export default DropInput;
