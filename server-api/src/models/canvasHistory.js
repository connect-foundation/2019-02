const mongoose = require('mongoose');

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

module.exports = mongoose.model('canvasHistory', CanvasHistorySchema);
