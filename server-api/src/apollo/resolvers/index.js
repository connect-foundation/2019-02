const resolvers = {
  Query: {
    hello: (_, __, context) => `Hello dropy! context: ${JSON.stringify(context)}`,
  },
};

module.exports = resolvers;
