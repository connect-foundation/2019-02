import { useQuery } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';
import { CHAT_SORT_BY_RECENT } from '@/constants';

const useGetChatsCached = () => {
  const queryResult = useQuery(GET_CHAT_CACHED);
  const data = queryResult.data ? queryResult.data.chatLogs : {
    logs: [],
    cached: false,
    changeType: null,
    sortType: CHAT_SORT_BY_RECENT,
  };

  return data;
};

export default useGetChatsCached;
