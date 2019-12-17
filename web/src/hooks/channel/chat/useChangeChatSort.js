import { useApolloClient } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';
import { chatInit } from '@/graphql/cache/chat';

const useChangeChatSort = () => {
  const client = useApolloClient();
  const changeSortType = (sortType) => {
    const { chatLogs } = client.readQuery({ query: GET_CHAT_CACHED });
    const data = {
      chatLogs: {
        ...chatLogs,
        changeAction: chatInit(),
        sortType,
      },
    };

    client.writeQuery({ query: GET_CHAT_CACHED, data });
  };

  return changeSortType;
};

export default useChangeChatSort;
