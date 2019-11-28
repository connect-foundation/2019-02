import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';

const GET_USER_STATUS = gql`
  query GetUserStatus {
    authentication @client {
      isLoggedIn
      isAnonymous
      userId
      displayName
      token
    }
  }
`;

const useGetUserStatus = (isReadOnlyCache) => {
  const client = useApolloClient();
  const readCache = () => {
    const { authentication } = client.readQuery({ query: GET_USER_STATUS });
    return authentication;
  };

  if (isReadOnlyCache) return readCache();

  const { data, loading } = useQuery(GET_USER_STATUS);

  if (loading) return readCache();

  return data.authentication;
};

export { GET_USER_STATUS };
export default useGetUserStatus;
