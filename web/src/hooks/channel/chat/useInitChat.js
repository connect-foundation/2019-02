import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { CHAT_SORT_BY_RECENT } from '@/constants';
import { GET_CHAT_CACHED } from './useChatChanged';

const GET_CHAT_LOGS = gql`
  query InitChatLogs($channelId: String!) {
    getChatLogs(channelId: $channelId) {
      id
      author {
        userId
        displayName
      }
      message
      likes
      createdAt
    }
  }
`;

const useInitChat = (channelId) => {
  const client = useApolloClient();
  const [loadChats, query] = useLazyQuery(GET_CHAT_LOGS, {
    variables: { channelId },
    fetchPolicy: 'no-cache',
  });
  const cleanChatCache = () => {
    client.writeQuery({
      query: GET_CHAT_CACHED,
      data: {
        chatLogs: {
          __typename: 'chatLogs',
          logs: [],
          changeType: null,
          sortType: CHAT_SORT_BY_RECENT,
        },
      },
    });
  };
  const writeChatCache = () => {
    if (!query.called || query.loading) return;

    const { chatLogs } = client.readQuery({ query: GET_CHAT_CACHED });
    const logs = query.data.getChatLogs;

    client.writeQuery({
      query: GET_CHAT_CACHED,
      data: {
        chatLogs: {
          __typename: 'chatLogs',
          logs: [...logs, ...chatLogs.logs],
          changeType: null,
          sortType: CHAT_SORT_BY_RECENT,
        },
      },
    });
  };

  useEffect(() => {
    loadChats();
    return cleanChatCache;
  }, []);
  useEffect(() => {
    writeChatCache();
  }, [query]);
};

export default useInitChat;
