import { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_CHAT_CACHED } from './useChatChanged';

const INIT_CHAT_LOGS = gql`
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

const useInitChatLogs = (channelId) => {
  const client = useApolloClient();
  const result = useQuery(INIT_CHAT_LOGS, { variables: { channelId } });
  const chatLogsCached = result.data ? result.data.getChatLogs : [];

  useEffect(() => {
    const { chatLogs } = client.readQuery({ query: GET_CHAT_CACHED });

    if (result.loading || chatLogs.cached) return;

    const data = {
      chatLogs: {
        ...chatLogs,
        logs: [...chatLogsCached, ...chatLogs.logs],
        cached: true,
      },
    };

    client.writeQuery({ query: GET_CHAT_CACHED, data });
  }, [result.loading]);

  return chatLogsCached;
};

export default useInitChatLogs;
