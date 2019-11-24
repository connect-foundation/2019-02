import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

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
  const result = useSubscription(CHAT_ADDED, { variables: { channelId } });
  const data = result.data ? result.data.chatAdded : null;

  return { data };
};

export default useChatAdded;
