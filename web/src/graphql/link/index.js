import { from, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import authLink from './auth';
import { GRAPHQL_API, GRAPHQL_WS_API } from '@/constants';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.error(graphQLErrors, networkError);
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_API,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API,
});

const link = from([
  errorLink,
  authLink,
  split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  ),
]);

export default link;
