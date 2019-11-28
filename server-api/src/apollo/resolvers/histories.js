const { ApolloError } = require('apollo-server-express');
const Histories = require('../../models/histories');

const getHistories = async (_, __, { user }) => {
  try {
    const histories = (await Histories.find({ userId: user.userId })) || [];
    const payloads = await Promise.all(histories.map((history) => history.toPayload()));

    return payloads;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Query: {
    getHistories,
  },
};

module.exports = resolvers;
