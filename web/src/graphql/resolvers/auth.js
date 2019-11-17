const resolvers = {
  Mutation: {
    logIn: (_, { token, displayName }, { cache }) => {
      const data = {
        authentication: {
          __typename: 'authentication',
          isLoggedIn: true,
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
