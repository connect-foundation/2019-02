import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LOGOUT = gql`
  mutation LogOut($token: String!) {
    logOut(token: $token) @client
  }
`;

const useLogout = () => {
  const [logOut] = useMutation(LOGOUT);
  return { mutate: logOut };
};

export default useLogout;
