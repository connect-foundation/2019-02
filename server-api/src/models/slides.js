const mongoose = require('mongoose');
const { assignFilter } = require('../utils/object');

const { Schema } = mongoose;

const SlideSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  currentSlide: {
    type: Number,
    required: true,
    default: 0,
  },
});

SlideSchema.statics.upsert = function upsertSlide(channelId, currentSlide) {
  const SlideModel = this;
  const findSlide = SlideModel.findOne({ channelId });

  return findSlide.then((slide) => {
    if (slide) return slide;

    const slideInfo = {
      channelId,
      currentSlide,
    };
    const newSlide = new SlideModel(slideInfo);

    return newSlide.save();
  }).catch((error) => {
    throw error;
  });
};

SlideSchema.methods.toPayload = function toSlidePayload(...objs) {
  const slide = this;

  return assignFilter([
    'currentSlide',
  ], slide, ...objs);
};


module.exports = mongoose.model('slides', SlideSchema);
