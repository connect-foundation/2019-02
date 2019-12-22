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

    const payload = canvasHistory.toPayload();

    return payload;
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
    const canvasHistory = await CanvasHistory.findOne({ channelId, page });

    if (!canvasHistory) {
      const newCanvasHistory = await new CanvasHistory({
        channelId,
        page,
        history: [],
        toolOptions,
      }).save();
      const payload = newCanvasHistory.toPayload();

      return payload;
    }
    const payload = canvasHistory.toPayload();

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const resetCanvasHistory = async (_, { channelId, page }) => {
  try {
    const defaultToolOptions = {
      lineWidth: 0,
      lineCap: '',
      lineColor: '',
    };
    const canvasHistory = await CanvasHistory.findOneAndUpdate(
      { channelId, page },
      { $set: { history: [], toolOptions: defaultToolOptions } },
      { returnOriginal: false },
    );
    const payload = canvasHistory.toPayload();

    return payload;
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
    resetCanvasHistory,
  },
};

module.exports = resolvers;
