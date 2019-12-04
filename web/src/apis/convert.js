import { get, post, polling } from './http';
import {
  CONVERT_API,
  CONVERT_PROGRESS_API,
  PROGRESS_LAST_MESSAGE,
} from '@/constants';

const uploadFile = async (channelId, data) => {
  const response = await post({
    url: `${CONVERT_API}/${channelId}`,
    body: data,
  });
  const {
    status,
    slideUrls,
    fileUrl,
  } = await response.json();

  return {
    status,
    slideUrls,
    fileUrl,
  };
};

const subscribeProgress = (channelId, callback) => {
  const url = `${CONVERT_PROGRESS_API}/${channelId}`;

  return polling({ url, callback });
};

export {
  uploadFile,
  subscribeProgress,
};
