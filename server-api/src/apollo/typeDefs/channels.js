const typeDefs = `
type Channel {
  channelId: String!
  master: User 
  channelName: String
  maxHeadCount: Int
  slideUrls: [String]
  fileUrl: String
  channelStatus: String
  currentSlide: Int!
}

type getChannelResponse {
  status: String!
  isMaster: Boolean!
  channel: Channel
}

type CreateChannelResponse {
  status: String!
  channel: Channel
}

type SlideResponse {
  currentSlide: Int!
}

extend type Query {
  getChannel(channelId: String!): getChannelResponse
}

extend type Mutation {
  createChannel(
    channelId: String!, 
    slideUrls: [String], 
    fileUrl: String,
  ): CreateChannelResponse,
  setCurrentSlide(channelId: String!, currentSlide: Int!): SlideResponse
}

extend type Subscription {
  slideChanged(channelId: String!): SlideResponse
}
`;

module.exports = typeDefs;
