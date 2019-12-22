import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import S from './style';
import { uploadFile, subscribeProgress } from '@/apis';
import { useCreateChannel } from '@/hooks';
import createFormData from '@/utils/createFormdata';
import getRandomItemOfList from '@/utils/random';
import createChannelId from '@/utils/uuid';
import checkFileTypeValidation from '@/utils/file';
import {
  EMOJI_LIST,
  TEMP_ERROR_MESSAGE,
  CREATING_CHANNEL_MESSAGE,
  FILE_TYPE_VALIDATION_ERROR_MESSAGE,
  MAIN_REDUCER_SET_LOADING_MODAL,
  CHANNEL_CODE_LENGTH,
  DROP_MODAL_DEFAULT_DROP_EMOJI,
  MAIN_REDUCER_SET_ERROR_MODAL,
  MAIN_REDUCER_SET_DRAG_OVER,
  MAIN_REDUCER_SET_DROP_ZONE_EMOJI,
} from '@/constants';

const DropZone = (props) => {
  const { dropModalDispatch } = props;
  const { mutate, data } = useCreateChannel();
  const handleDrop = async (event) => {
    event.preventDefault();

    const channelId = createChannelId();
    const channelCode = channelId.substring(0, CHANNEL_CODE_LENGTH);
    const { dataTransfer: { files } } = event;
    const file = files[0];

    if (checkFileTypeValidation(file)) {
      dropModalDispatch({
        type: MAIN_REDUCER_SET_LOADING_MODAL,
        payload: CREATING_CHANNEL_MESSAGE,
      });
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
            slideUrls,
            fileUrl,
            channelCode,
            slideRatioList,
          },
        });
      } else {
        dropModalDispatch({
          type: MAIN_REDUCER_SET_ERROR_MODAL,
          payload: TEMP_ERROR_MESSAGE,
        });
      }
    } else {
      dropModalDispatch({
        type: MAIN_REDUCER_SET_ERROR_MODAL,
        payload: FILE_TYPE_VALIDATION_ERROR_MESSAGE,
      });
    }
  };
  const handleDragEnter = (event) => {
    event.preventDefault();

    dropModalDispatch({ type: MAIN_REDUCER_SET_DRAG_OVER });
    dropModalDispatch({
      type: MAIN_REDUCER_SET_DROP_ZONE_EMOJI,
      payload: getRandomItemOfList(EMOJI_LIST),
    });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();

    dropModalDispatch({ type: MAIN_REDUCER_SET_DRAG_OVER });
    dropModalDispatch({
      type: MAIN_REDUCER_SET_DROP_ZONE_EMOJI,
      payload: DROP_MODAL_DEFAULT_DROP_EMOJI,
    });
  };

  if (data) {
    return <Redirect to={`/channels/${data.channelId}`} />;
  }

  return (
    <S.DropZone
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    />
  );
};

DropZone.propTypes = {
  dropModalDispatch: PropTypes.func.isRequired,
};

export default DropZone;
