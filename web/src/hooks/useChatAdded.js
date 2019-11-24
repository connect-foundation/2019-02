import { useEffect } from 'react';
import gql from 'graphql-tag';
import {
  useSubscription,
  useMutation,
} from '@apollo/react-hooks';

const CACHE_CHAT_ADDED = gql`
  mutation addChat($chat: Chat) {
    addChat(chat: $chat) @client {
      logs
    }
  }
`;

const CHAT_ADDED = gql`
  subscription ChatAdded($channelId: String!) {
    chatAdded(channelId: $channelId) {
      author {
        displayname
      }
      message
      createdAt
    }
  }
`;

const useChatAdded = (channelId) => {
  const [cacheChat, mutationResult] = useMutation(CACHE_CHAT_ADDED);
  const result = useSubscription(CHAT_ADDED, { variables: { channelId } });
  const data = result.data ? result.data.chatAdded : null;
  const chatLogs = mutationResult.data ? mutationResult.data.addChat.logs.filter(log => log) : null;

  useEffect(() => {
    cacheChat({ variables: { chat: data } });
  }, [data]);

  return { data: chatLogs };
};

export default useChatAdded;
