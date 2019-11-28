import { useApolloClient } from '@apollo/react-hooks';
import { GET_USER_STATUS } from './useGetUserStatus';

const useLogout = () => {
  const client = useApolloClient();
  const logOut = () => {
    const data = {
      authentication: {
        __typename: 'authentication',
        isLoggedIn: false,
        isAnonymous: true,
        userId: '',
        displayName: '',
        token: '',
      },
    };

    window.localStorage.removeItem('DROPY_TOKEN');
    window.localStorage.removeItem('DROPY_USER_ID');
    window.localStorage.removeItem('DROPY_USERNAME');
    client.writeQuery({ query: GET_USER_STATUS, data });
  };

  return logOut;
};

export default useLogout;
