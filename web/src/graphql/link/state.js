import { withClientState } from 'apollo-link-state';
import inMemoryCache from '../cache';

const defaults = {
  authentication: {
    __typename: 'authentication',
    isLoggedIn: !!localStorage.getItem('DROPY_TOKEN'),
    displayName: localStorage.getItem('DROPY_USERNAME'),
    token: localStorage.getItem('DROPY_TOKEN'),
  },
};

const resolvers = {
  Mutation: {
    logIn: (_, { token, displayName }, { cache }) => {
      localStorage.setItem('DROPY_TOKEN', token);
      localStorage.setItem('DROPY_USERNAME', displayName);

      cache.writeData({
        data: {
          authentication: {
            __typename: 'authentication',
            isLoggedIn: true,
            displayName,
            token,
          },
        },
      });
    },
  },
};

const stateLink = withClientState({
  defaults,
  resolvers,
  cache: inMemoryCache,
});

export default stateLink;
