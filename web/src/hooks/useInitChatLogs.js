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
    }
  }
`;

const useInitChatLogs = (channelId) => {
  const client = useApolloClient();
  const result = useQuery(INIT_CHAT_LOGS, { variables: { channelId } });
  const chatLogs = result.data ? result.data.getChatLogs : [];

  useEffect(() => {
    const { chatLogs: { logs, cached, changeType } } = client.readQuery({ query: GET_CHAT_CACHED });

    if (result.loading || cached) return;

    const data = {
      chatLogs: {
        __typename: 'chatLogs',
        logs: [...chatLogs, ...logs],
        cached: true,
        changeType,
      },
    };

    client.writeQuery({ query: GET_CHAT_CACHED, data });
  }, [result.loading]);

  return chatLogs;
};

export default useInitChatLogs;
