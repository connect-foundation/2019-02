const mongoose = require('mongoose');

const { Schema } = mongoose;

const HistorySchema = new Schema({
  userId: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
  },
  channelId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

HistorySchema.statics.upsert = function upsertUser(userId, channelId) {
  const HistoryModel = this;
  const findHistory = HistoryModel.find({ userId });

  return findHistory.then((user) => {
    if (user) return user;

    const updateDate = Date.now();
    const historyInfo = {
      userId,
      channelId,
      updateDate,
    };
    const newHistory = new HistoryModel(historyInfo);

    return newHistory.save();
  }).catch((error) => {
    throw error;
  });
};

module.exports = mongoose.model('history', HistorySchema);
