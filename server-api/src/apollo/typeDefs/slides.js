const typeDefs = `
type Slide {
  currentSlide: Int!
}

extend type Query {
  getCurrentSlide(channelId: String!): Slide
}

extend type Mutation {
  setCurrentSlide(channelId: String!, currentSlide: Int!): Slide
}

extend type Subscription {
  slideChanged(channelId: String!): Slide
}
`;

module.exports = typeDefs;
