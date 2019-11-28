import { useApolloClient } from '@apollo/react-hooks';
import { GET_USER_STATUS } from './useGetUserStatus';

const useLogin = () => {
  const client = useApolloClient();
  const logIn = ({
    token = '',
    userId = '',
    displayName = '익명',
    isAnonymous = false,
  }) => {
    const data = {
      authentication: {
        __typename: 'authentication',
        isLoggedIn: !isAnonymous,
        isAnonymous,
        userId,
        displayName,
        token,
      },
    };

    window.localStorage.setItem('DROPY_TOKEN', token);
    window.localStorage.setItem('DROPY_USER_ID', userId);
    window.localStorage.setItem('DROPY_USERNAME', displayName);
    client.writeQuery({ query: GET_USER_STATUS, data });
  };

  return logIn;
};

export { GET_USER_STATUS };
export default useLogin;
