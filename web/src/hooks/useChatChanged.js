import gql from 'graphql-tag';
import {
  useSubscription,
  useApolloClient,
  useQuery,
} from '@apollo/react-hooks';

const GET_CHAT_CACHED = gql`
  query GetChatCached {
    chatLogs @client {
      logs
      cached
    }
  }
`;

const CHAT_CHANGED = gql`
  subscription ChatChanged($channelId: String!) {
    chatChanged(channelId: $channelId) {
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

const addOrUpdateChat = (chatLogs, chat) => {
  const indexOfChat = chatLogs.findIndex(({ id }) => id === chat.id);
  const newChatLogs = [...chatLogs];

  if (indexOfChat === -1) {
    newChatLogs.push(chat);
  } else {
    newChatLogs.splice(indexOfChat, 1, chat);
  }

  return newChatLogs;
};

const useChatChanged = (channelId) => {
  const client = useApolloClient();
  const published = useSubscription(CHAT_CHANGED, { variables: { channelId } });
  const chatChanged = published.data && published.data.chatChanged;
  const queryResult = useQuery(GET_CHAT_CACHED);
  const logs = queryResult.data ? queryResult.data.chatLogs.logs : [];

  if (!chatChanged) return;

  const newLogs = addOrUpdateChat(logs, chatChanged);
  const data = {
    chatLogs: {
      __typename: 'chatLogs',
      logs: newLogs,
      cached: queryResult.data.chatLogs.cached,
    },
  };

  client.writeQuery({ query: GET_CHAT_CACHED, data });
};

export { GET_CHAT_CACHED };
export default useChatChanged;
