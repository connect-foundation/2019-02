import gql from 'graphql-tag';
import {
  useSubscription,
  useApolloClient,
} from '@apollo/react-hooks';

const GET_CHAT_CACHED = gql`
  query GetChatCached {
    chatLogs @client {
      logs
    }
  }
`;

const CHAT_CHANGED = gql`
  subscription ChatChanged($channelId: String!) {
    chatChanged(channelId: $channelId) {
      id
      author {
        displayName
      }
      message
    }
  }
`;

const useChatAdded = (channelId) => {
  const client = useApolloClient();
  const published = useSubscription(CHAT_CHANGED, { variables: { channelId } });
  const chatAdded = published.data && published.data.chatChanged;
  const { chatLogs: { logs } } = client.readQuery({ query: GET_CHAT_CACHED });

  if (!chatAdded) return { data: logs };

  const newLogs = [...logs, chatAdded];
  const data = {
    chatLogs: {
      __typename: 'chatLogs',
      logs: newLogs,
    },
  };

  client.writeQuery({ query: GET_CHAT_CACHED, data });

  return { data: newLogs };
};

export default useChatAdded;
