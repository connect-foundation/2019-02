import gql from 'graphql-tag';
import {
  useSubscription,
  useApolloClient,
} from '@apollo/react-hooks';
import { CHAT_ADDED, CHAT_UPDATED } from '@/constants';

const GET_CHAT_CACHED = gql`
  query GetChatCached {
    chatLogs @client {
      logs
      changeType
      sortType
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
      isQuestion
      createdAt
    }
  }
`;

const addOrUpdateChat = (cacheData, chat) => {
  const { chatLogs } = cacheData;
  const indexOfChat = chatLogs.logs.findIndex(({ id }) => id === chat.id);
  const newData = {
    chatLogs: {
      ...chatLogs,
      logs: [...chatLogs.logs],
    },
  };

  if (indexOfChat === -1) {
    newData.chatLogs.logs.push(chat);
    newData.chatLogs.changeType = CHAT_ADDED;
  } else {
    newData.chatLogs.logs.splice(indexOfChat, 1, chat);
    newData.chatLogs.changeType = CHAT_UPDATED;
  }

  return newData;
};

const useChatChanged = (channelId) => {
  const client = useApolloClient();
  const published = useSubscription(CHAT_CHANGED, { variables: { channelId } });
  const chatChanged = published.data && published.data.chatChanged;

  if (!chatChanged) return;

  const cacheData = client.readQuery({ query: GET_CHAT_CACHED });
  const data = addOrUpdateChat(cacheData, chatChanged);

  client.writeQuery({ query: GET_CHAT_CACHED, data });
};

export { GET_CHAT_CACHED };
export default useChatChanged;
