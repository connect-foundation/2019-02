const mongoose = require('mongoose');
const { assignFilter } = require('../utils/object');

const { Schema } = mongoose;

const CanvasHistorySchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  history: {
    type: Array,
    required: true,
  },
  toolOptions: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CanvasHistorySchema.methods.toPayload = function toCanvasHistoryPayload(...objs) {
  const canvasHistory = this;
  // eslint-disable-next-line no-underscore-dangle
  const id = canvasHistory._id;

  return assignFilter([
    'id',
    'channelId',
    'page',
    'history',
    'toolOptions',
  ], canvasHistory, { id }, ...objs);
};

module.exports = mongoose.model('canvasHistory', CanvasHistorySchema);
