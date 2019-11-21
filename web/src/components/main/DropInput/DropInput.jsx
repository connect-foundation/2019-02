import React from 'react';
import { Button } from '@material-ui/core';

const DropInput = () => (
  <>
    <input
      id="upload-file"
      multiple
      type="file"
      style={{ display: 'none' }}
    />
    <label htmlFor="upload-file">
      <Button variant="contained" component="span">
        <span>or 파일 업로드 </span>
        <span role="img" aria-label="upload-emoji">📂</span>
      </Button>
    </label>
  </>
);

export default DropInput;
