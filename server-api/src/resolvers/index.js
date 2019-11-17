const resolvers = {
  Query: {
    hello: (_, __, context) => {
      console.log('Context: ', context);

      return 'Hello dropy!';
    },
  },
};

module.exports = resolvers;
