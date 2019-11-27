import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LIKE_CHAT = gql`
  mutation LikeChat($chatId: String!) {
    likeChat(chatId: $chatId) {
      id
    }
  }
`;

const useLikeChat = () => {
  const [likeChat] = useMutation(LIKE_CHAT);
  return { mutate: likeChat };
};

export default useLikeChat;
