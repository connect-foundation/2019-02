import { ApolloClient } from 'apollo-client';
import link from './link';
import cache from './cache';
import resolvers from './resolvers';

const token = localStorage.getItem('DROPY_TOKEN');
const tokenAnonymous = localStorage.getItem('DROPY_ANONYMOUS_TOKEN');
const userId = localStorage.getItem('DROPY_USER_ID');
const displayName = localStorage.getItem('DROPY_USERNAME');

const defaultCacheData = {
  authentication: {
    __typename: 'authentication',
    isLoggedIn: !!token,
    isAnonymous: !token && !!tokenAnonymous,
    userId,
    displayName,
    token: token || tokenAnonymous,
  },
  chatLogs: {
    __typename: 'chatLogs',
    logs: [],
    cached: false,
    changeType: null,
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
