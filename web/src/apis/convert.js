import { post } from './http';
import { CONVERT_API } from '@/constants';

const uploadFile = async (data) => {
  const response = await post({
    url: CONVERT_API,
    body: data,
  });
  const { status } = await response.json();

  return status;
};

export default uploadFile;
