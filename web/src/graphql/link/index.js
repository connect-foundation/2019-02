import { from, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import authLink from './auth';
import { GRAPHQL_API, GRAPHQL_WS_API } from '@/constants';
import getToken from '../cache/getToken';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.error(graphQLErrors, networkError);
});

const wsParams = {
  channelId: null,
  isMaster: false,
};
const wsClient = new SubscriptionClient(GRAPHQL_WS_API, {
  reconnect: true,
  connectionParams: () => ({
    token: getToken(),
    ...wsParams,
  }),
});

const wsLink = new WebSocketLink(wsClient);

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

export { wsClient, wsParams };
export default link;
