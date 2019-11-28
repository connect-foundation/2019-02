import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_HISTORY = gql`
  mutation AddHistory($userId: String!, $masterId: String!, $channelId: String!, $updatedAt: Date!) {
    addHistory(userId: $userId, masterId: $masterId, channelId: $channelId, updatedAt: $updatedAt) @client
  }
`;

const useAddUserHistory = () => {
  const [addHistory] = useMutation(ADD_HISTORY);
  return { mutate: addHistory };
};

export default useAddUserHistory;
