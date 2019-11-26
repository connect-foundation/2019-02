const resolvers = {
  Mutation: {
    logInAnonymous: (_, { token }, { cache }) => {
      const displayName = '익명';
      const data = {
        authentication: {
          __typename: 'authentication',
          isLoggedIn: false,
          isAnonymous: true,
          displayName,
          token,
        },
      };

      localStorage.setItem('DROPY_ANONYMOUS_TOKEN', token);
      localStorage.setItem('DROPY_USERNAME', displayName);
      cache.writeData({ data });
    },
    logIn: (_, { token, displayName }, { cache }) => {
      const data = {
        authentication: {
          __typename: 'authentication',
          isLoggedIn: true,
          isAnonymous: false,
          displayName,
          token,
        },
      };

      localStorage.setItem('DROPY_TOKEN', token);
      localStorage.setItem('DROPY_USERNAME', displayName);
      cache.writeData({ data });
    },
    logOut: (_, __, { cache }) => {
      const data = {
        authentication: {
          __typename: 'authentication',
          isLoggedIn: false,
          isAnonymous: false,
          displayName: '',
          token: '',
        },
      };

      localStorage.removeItem('DROPY_TOKEN');
      localStorage.removeItem('DROPY_USERNAME');
      cache.writeData({ data });
    },
  },
};

export default resolvers;
