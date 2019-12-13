import {
  parseMessage,
  checkIsQuestion,
  getSliceIndex,
  getToken,
  pipe,
} from '@/utils';

const useGetQuestion = (text, limit) => pipe(
  parseMessage,
  checkIsQuestion,
  getSliceIndex,
  getToken,
)(text, limit);

export default useGetQuestion;
