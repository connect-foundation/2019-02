import { useQuery } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';

const useGetChatsCached = () => {
  const { loading, data } = useQuery(GET_CHAT_CACHED);
  const chatCache = loading ? [] : data.chatLogs;

  return { loading, chatCache };
};

export default useGetChatsCached;
