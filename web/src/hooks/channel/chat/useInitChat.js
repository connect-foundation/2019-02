import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
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
  const query = useQuery(GET_CHAT_LOGS, { variables: { channelId } });
  const logs = query.loading ? [] : query.data.getChatLogs;
  const cleanChatCache = () => {
    const { chatLogs } = client.readQuery({ query: GET_CHAT_CACHED });
    const chatsCleaned = chatLogs.logs.filter(({ cached }) => !cached);

    client.writeQuery({
      query: GET_CHAT_CACHED,
      data: {
        chatLogs: {
          __typename: 'chatLogs',
          logs: chatsCleaned,
          changeType: null,
          sortType: CHAT_SORT_BY_RECENT,
        },
      },
    });
  };
  const writeChatCache = () => {
    if (query.loading) return;

    const { chatLogs } = client.readQuery({ query: GET_CHAT_CACHED });
    const logsCached = logs.map((chat) => ({ ...chat, cached: true }));

    client.writeQuery({
      query: GET_CHAT_CACHED,
      data: {
        chatLogs: {
          __typename: 'chatLogs',
          logs: [...logsCached, ...chatLogs.logs],
          changeType: null,
          sortType: CHAT_SORT_BY_RECENT,
        },
      },
    });
  };

  useEffect(() => cleanChatCache, []);
  useEffect(() => { writeChatCache(); }, [query]);
};

export default useInitChat;
