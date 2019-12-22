import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { uploadFile, subscribeProgress } from '@/apis';
import createChannelId from '@/utils/uuid';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';
import S from './style';
import {
  TEMP_ERROR_MESSAGE,
  REJECT_ERROR_MESSAGE,
  CREATING_CHANNEL_MESSAGE,
  CHANNEL_CODE_LENGTH,
  MAIN_REDUCER_SET_LOADING_MODAL,
  MAIN_REDUCER_CLOSE_LOADING_MODAL,
  MAIN_REDUCER_SET_ERROR_MODAL,
} from '@/constants';

const DropInput = (props) => {
  const { mutate, data } = useCreateChannel();
  const { dropModalDispatch } = props;
  const handleUpload = async (e) => {
    dropModalDispatch({
      type: MAIN_REDUCER_SET_LOADING_MODAL,
      payload: CREATING_CHANNEL_MESSAGE,
    });

    const channelId = createChannelId();
    const channelCode = channelId.substring(0, CHANNEL_CODE_LENGTH);
    const file = e.target.files[0];
    const formData = createFormData({ file });
    const unsubscribeProgress = subscribeProgress(channelId, ({ status, message }) => {
      if (status === 'timeout') {
        dropModalDispatch({
          type: MAIN_REDUCER_SET_ERROR_MODAL,
          payload: message,
        });
      } else {
        dropModalDispatch({
          type: MAIN_REDUCER_SET_LOADING_MODAL,
          payload: message,
        });
      }
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
          channelCode,
          slideUrls,
          fileUrl,
          slideRatioList,
        },
      });
    } else {
      dropModalDispatch({ type: MAIN_REDUCER_CLOSE_LOADING_MODAL });
      dropModalDispatch({ type: MAIN_REDUCER_SET_ERROR_MODAL, payload: TEMP_ERROR_MESSAGE });
      const payload = status === 'reject' ? REJECT_ERROR_MESSAGE : TEMP_ERROR_MESSAGE;
      dropModalDispatch({ type: MAIN_REDUCER_SET_ERROR_MODAL, payload });
    }
  };

  if (data) {
    return <Redirect to={`/channels/${data.channelId}`} />;
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
          accept=".pdf"
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
    </>
  );
};

DropInput.propTypes = {
  dropModalDispatch: PropTypes.func.isRequired,
};

export default DropInput;
