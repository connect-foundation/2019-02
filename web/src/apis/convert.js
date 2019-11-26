import { post } from './http';
import { CONVERT_API } from '@/constants';

const uploadFile = async (data) => {
  const response = await post({
    url: CONVERT_API,
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

export default uploadFile;
