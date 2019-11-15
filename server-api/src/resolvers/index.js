// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (_, __, context) => {
      console.log('Context: ', context);

      return 'Hello world!';
    },
  },
};

module.exports = resolvers;
