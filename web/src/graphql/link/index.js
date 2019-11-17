import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import authLink from './auth';
import { GRAPHQL_API } from '@/constants';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors, networkError);
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API,
});

const link = from([
  errorLink,
  authLink,
  httpLink,
]);

export default link;
