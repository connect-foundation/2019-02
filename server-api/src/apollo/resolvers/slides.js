const { withFilter, ApolloError } = require('apollo-server-express');
const Slide = require('../../models/slides');

const SLIDE_CHANGED = 'SLIDE_CHANGED';

const setCurrentSlide = async (_, { channelId, currentSlide }, { pubsub }) => {
  try {
    const slide = await Slide.findOneAndUpdate({ channelId }, { currentSlide }, {
      new: true,
      upsert: true,
    });
    const payload = slide.toPayload();
    pubsub.publish(SLIDE_CHANGED, { slideChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};


const getCurrentSlide = async (_, { channelId }) => {
  try {
    const slide = await Slide.findOne({ channelId });
    const currendSlide = slide ? slide.toPayload() : 0;

    return currendSlide;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const slideChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(SLIDE_CHANGED),
    (payload, variables) => payload.slideChanged.channelId === variables.channelId,
  ),
};

const resolvers = {
  Query: {
    getCurrentSlide,
  },
  Mutation: {
    setCurrentSlide,
  },
  Subscription: {
    slideChanged,
  },
};

module.exports = resolvers;
