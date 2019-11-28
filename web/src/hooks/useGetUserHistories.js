import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER_HISTORIES = gql`
  query GetUserHistories  {
    getHistories {
      channel {
        channelId
        channelName
        channelStatus
        master {
          userId
          displayName
        }
      }
      updatedAt
    }
  }
`;

const useGetUserHistories = () => {
  const result = useQuery(GET_USER_HISTORIES);
  const data = result.data ? result.data.getHistories : null;

  return { data, loading: result.loading };
};
export default useGetUserHistories;
