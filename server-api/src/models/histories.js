const mongoose = require('mongoose');
const Channels = require('./channels');

const { Schema } = mongoose;

const HistorySchema = new Schema({
  userId: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
  },
  masterId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

HistorySchema.statics.upsert = function upsertHistory(userId, channelId) {
  const HistoryModel = this;
  const findHistory = HistoryModel.find({ userId });

  return findHistory.then((history) => {
    if (history) {
      const historyExisted = history;

      historyExisted.updatedAt = Date.now();

      return historyExisted.save();
    }

    const historyInfo = {
      userId,
      channelId,
      updatedAt: Date.now(),
    };
    const newHistory = new HistoryModel(historyInfo);

    return newHistory.save();
  }).catch((error) => {
    throw error;
  });
};

HistorySchema.methods.toPayload = async function toHistoryPayload() {
  const history = this;
  const { channelId, updatedAt } = history;
  const channel = await Channels.findOne({ channelId });
  console.log(channel);
  const channelPayload = channel ? channel.toPayload() : {
    master: {},
    slideUrls: [],
  };

  return { channel: channelPayload, updatedAt };
};

module.exports = mongoose.model('history', HistorySchema);
