import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_CHAT = gql`
  mutation AddChat($channelId: String!, $message: String!) {
    addChat(channelId: $channelId, message: $message) {
      message
      createdAt
    }
  }
`;

const useAddChat = () => {
  const [addChat] = useMutation(ADD_CHAT);
  return { mutate: addChat };
};

export default useAddChat;
