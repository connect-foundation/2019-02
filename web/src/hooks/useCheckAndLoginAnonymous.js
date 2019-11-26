import { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { authByAnonymous } from '@/apis';

const GET_AUTH = gql`
  query Auth {
    authentication @client {
      token
    }
  }
`;

const LOGIN_ANONYMOUS = gql`
  mutation LogInAnonymous($token: String!) {
    logInAnonymous(token: $token) @client
  }
`;

const useCheckAndLoginAnonymous = () => {
  const authResult = useQuery(GET_AUTH);
  const [logInAnonymous] = useMutation(LOGIN_ANONYMOUS);
  const isTokenExisted = authResult.data && authResult.data.authentication.token;

  useEffect(() => {
    if (isTokenExisted) return;

    authByAnonymous().then(({ token }) => {
      logInAnonymous({ variables: { token } });
    });
  }, [isTokenExisted]);
};

export default useCheckAndLoginAnonymous;
