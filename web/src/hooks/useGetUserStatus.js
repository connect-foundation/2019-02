import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';

const GET_USER_STATUS = gql`
  query GetUserStatus {
    authentication @client {
      isLoggedIn
      isAnonymous
      userId
      displayName
    }
  }
`;

const useGetUserStatus = () => {
  const client = useApolloClient();
  const { authentication } = client.readQuery({ query: GET_USER_STATUS });

  return authentication;
};

export default useGetUserStatus;
