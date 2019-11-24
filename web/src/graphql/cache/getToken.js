import gql from 'graphql-tag';
import cache from './index';

const getToken = () => {
  const { authentication: { token } } = cache.readQuery({
    query: gql`
      query Auth {
        authentication @client {
          token
        }
      }
    `,
  });

  return token;
};

export default getToken;
