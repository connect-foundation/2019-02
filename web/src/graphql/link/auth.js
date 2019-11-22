import { ApolloLink, Observable } from 'apollo-link';
import getToken from '../cache/getToken';

const authLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  operation.setContext({
    headers: {
      'x-auth-token': getToken(),
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
