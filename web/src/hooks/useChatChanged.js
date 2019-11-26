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
      isLiked
      likesCount
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
  const { chatLogs: { logs } } = client.readQuery({ query: GET_CHAT_CACHED });

  if (!chatChanged) return { data: logs };

  const newLogs = addOrUpdateChat(logs, chatChanged);
  const data = {
    chatLogs: {
      __typename: 'chatLogs',
      logs: newLogs,
    },
  };

  client.writeQuery({ query: GET_CHAT_CACHED, data });

  return { data: newLogs };
};

export default useChatChanged;
