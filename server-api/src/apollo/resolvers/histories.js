const { ApolloError } = require('apollo-server-express');
const Histories = require('../../models/histories');

const histories = async (_, { userId }) => {
  try {
    const history = await Histories.find({ userId });
    const status = history ? 'ok' : 'not_exist';

    return { status };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Query: {
    histories: () => histories,
  },
};

module.exports = resolvers;
