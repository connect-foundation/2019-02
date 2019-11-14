import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import authLink from './auth';
import stateLink from './state';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors, networkError);
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const link = from([
  errorLink,
  authLink,
  stateLink,
  httpLink,
]);

export default link;
