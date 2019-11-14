import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginButton from './components/LoginButton/LoginButton';

const GET_AUTH = gql`
query Auth {
  authentication @client {
    isLoggedIn
    displayName
  }
}
`;

const App = () => {
  const { data: { authentication } } = useQuery(GET_AUTH);

  return (
    <div>
      {authentication.isLoggedIn ? (
        <div>{authentication.displayName}</div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default App;
