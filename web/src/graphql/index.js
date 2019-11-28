import { ApolloClient } from 'apollo-client';
import link from './link';
import cache from './cache';

const client = new ApolloClient({
  link,
  cache,
  resolvers: {},
});

export default client;
