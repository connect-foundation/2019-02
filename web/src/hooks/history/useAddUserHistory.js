import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_HISTORY = gql`
  mutation addHistory(
    $channelId: String!,
  ) {
    addHistory(
      channelId: $channelId,
    ) {
      status
      history {
        channel {
          channelId
        }
      }
    }
  }
`;

const useAddUserHistory = () => {
  const [addHistory, result] = useMutation(ADD_HISTORY);
  const data = result.data
    ? result.data.addHistory
    : { status: null, history: { userId: null, channelId: null } };

  return { mutate: addHistory, data };
};

export default useAddUserHistory;
