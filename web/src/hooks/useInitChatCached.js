import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';
import { CHAT_SORT_BY_RECENT } from '@/constants';

const useInitChatChached = () => {
  const client = useApolloClient();
  const data = {
    chatLogs: {
      __typename: 'chatLogs',
      logs: [],
      cached: false,
      changeType: null,
      sortType: CHAT_SORT_BY_RECENT,
    },
  };

  useEffect(() => {
    client.writeQuery({ query: GET_CHAT_CACHED, data });
  }, []);
};

export default useInitChatChached;
