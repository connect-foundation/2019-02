import React from 'react';
import { Button } from '@material-ui/core';
import { uploadFile } from '@/apis';
import createChannelId from '@/utils/uuid';

const DropInput = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const channelId = createChannelId();
    const data = new FormData();

    data.append('file', file);
    data.append('channelId', channelId);

    const status = await uploadFile(data);
    if (status === 'ok') {
      // Todo: 채널 생성
    } else {
      // Todo: error
    }
  };

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
