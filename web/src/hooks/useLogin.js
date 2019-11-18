import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation LogIn($token: String!, $displayName: String!) {
    logIn(token: $token, displayName: $displayName) @client
  }
`;

const useLogin = () => {
  const [logIn] = useMutation(LOGIN);
  return { mutate: logIn };
};

export default useLogin;
