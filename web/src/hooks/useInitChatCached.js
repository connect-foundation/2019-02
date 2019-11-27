import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';

const useInitChatChached = () => {
  const client = useApolloClient();
  const data = {
    chatLogs: {
      __typename: 'chatLogs',
      logs: [],
      cached: false,
      changeType: null,
    },
  };

  useEffect(() => {
    client.writeQuery({ query: GET_CHAT_CACHED, data });
  }, []);
};

export default useInitChatChached;
