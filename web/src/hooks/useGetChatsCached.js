import { useQuery } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';

const useGetChatsCached = () => {
  const queryResult = useQuery(GET_CHAT_CACHED);
  const data = queryResult.data ? queryResult.data.chatLogs : {
    logs: [],
    cached: false,
    changeType: null,
  };

  return data;
};

export default useGetChatsCached;
