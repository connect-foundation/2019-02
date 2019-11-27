import { useQuery } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';

const useGetChatsCached = () => {
  const { data } = useQuery(GET_CHAT_CACHED);
  const chatLogs = data ? data.chatLogs.logs : [];

  return chatLogs;
};

export default useGetChatsCached;
