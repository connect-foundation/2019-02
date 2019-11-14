import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GoogleButton from './components/LoginButton/GoogleButton';
import KakaoButton from './components/LoginButton/KakaoButton';
import NaverButton from './components/LoginButton/NaverButton';

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
        <>
          <GoogleButton />
          <KakaoButton />
          <NaverButton />
        </>
      )}
    </div>
  );
};

export default App;
