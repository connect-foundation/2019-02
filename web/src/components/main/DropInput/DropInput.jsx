import React from 'react';
import { Button } from '@material-ui/core';
import { uploadFile } from '@/apis';

const DropInput = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();

    data.append('file', file);
    await uploadFile(data);
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
