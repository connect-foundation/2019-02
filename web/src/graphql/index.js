import { ApolloClient } from 'apollo-client';
import link from './link';
import cache from './cache';
import resolvers from './resolvers';

const defaultCacheData = {
  authentication: {
    __typename: 'authentication',
    isLoggedIn: !!localStorage.getItem('DROPY_TOKEN'),
    displayName: localStorage.getItem('DROPY_USERNAME'),
    token: localStorage.getItem('DROPY_TOKEN'),
  },
};

const client = new ApolloClient({
  link,
  cache,
  resolvers,
});

cache.writeData({
  data: defaultCacheData,
});

export default client;
