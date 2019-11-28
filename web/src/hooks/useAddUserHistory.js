import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_HISTORY = gql`
  mutation AddHistory($userId: String!, $channelId: String!, $updatedAt: Date!) {
    addHistory(userId: $userId, channelId: $channelId, updatedAt: $updatedAt) @client
  }
`;

const useAddUserHistory = () => {
  const [addHistory] = useMutation(ADD_HISTORY);
  return { mutate: addHistory };
};

export default useAddUserHistory;
