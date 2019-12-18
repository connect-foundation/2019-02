const { ApolloError } = require('apollo-server-express');
const CanvasHistory = require('../../models/canvasHistory');

const addCanvasHistory = async (_, {
  channelId,
  page,
  history,
  toolOptions,
}) => {
  try {
    const canvasHistory = await CanvasHistory.findOne({
      channelId,
      page,
    });
    const oldHistory = canvasHistory.history;

    canvasHistory.history = oldHistory.concat(history);
    canvasHistory.toolOptions = toolOptions;
    canvasHistory.save();

    return canvasHistory;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getCanvasHistory = async (_, {
  channelId,
  page,
  toolOptions,
}) => {
  try {
    const canvasHistory = await CanvasHistory.findOne({
      channelId,
      page,
    });

    if (!canvasHistory) {
      const newCanvasHistory = await new CanvasHistory({
        channelId,
        page,
        history: [],
        toolOptions,
      }).save();
      return newCanvasHistory;
    }

    return canvasHistory;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resolvers = {
  Query: {
    getCanvasHistory,
  },
  Mutation: {
    addCanvasHistory,
  },
};

module.exports = resolvers;
