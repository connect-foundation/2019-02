import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER_HISTORIES = gql`
  query GetUserHistories  {
    getHistories {
      channel {
        channelId
        channelStatus
        master {
          userId
          displayName
        }
        channelOptions{
          channelName
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
