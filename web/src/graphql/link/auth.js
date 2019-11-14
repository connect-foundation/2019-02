import gql from 'graphql-tag';
import { ApolloLink, Observable } from 'apollo-link';
import cache from '../cache';

const authLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  const { authentication: { token } } = cache.readQuery({
    query: gql`
    query Auth {
      authentication @client {
        token
      }
    }
    `,
  });

  operation.setContext({
    headers: {
      'x-auth-token': token,
    },
  });

  const handle = forward(operation).subscribe({
    next: observer.next.bind(observer),
    error: observer.error.bind(observer),
    complete: observer.complete.bind(observer),
  });

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

export default authLink;
