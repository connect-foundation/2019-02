import gql from 'graphql-tag';
import {
  useSubscription,
  useApolloClient,
} from '@apollo/react-hooks';
import { CHAT_ADDED, CHAT_UPDATED, MY_CHAT_ADDED } from '@/constants';

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

const addOrUpdateChat = (userId, cacheData, chat) => {
  const { chatLogs } = cacheData;
  const indexOfChat = chatLogs.logs.findIndex(({ id }) => id === chat.id);
  const newData = {
    chatLogs: {
      ...chatLogs,
      logs: [...chatLogs.logs],
    },
  };

  if (indexOfChat === -1) {
    const changeType = chat.author.userId === userId ? MY_CHAT_ADDED : CHAT_ADDED;

    newData.chatLogs.logs.push(chat);
    newData.chatLogs.changeType = changeType;
  } else {
    newData.chatLogs.logs.splice(indexOfChat, 1, chat);
    newData.chatLogs.changeType = CHAT_UPDATED;
  }

  return newData;
};

const useChatChanged = (channelId, userId) => {
  const client = useApolloClient();
  const published = useSubscription(CHAT_CHANGED, { variables: { channelId } });
  const chatChanged = published.data && published.data.chatChanged;

  if (!chatChanged) return;

  const cacheData = client.readQuery({ query: GET_CHAT_CACHED });
  const data = addOrUpdateChat(userId, cacheData, chatChanged);

  client.writeQuery({ query: GET_CHAT_CACHED, data });
};

export { GET_CHAT_CACHED };
export default useChatChanged;
