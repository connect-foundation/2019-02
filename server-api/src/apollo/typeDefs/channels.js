const typeDefs = `
type Channel {
  channelId: String
  master: User 
  channelName: String
  maxHeadCount: Int
  slideUrls: [String]
  slideRatioList: [Float]
  fileUrl: String
  channelCode: String!
  channelStatus: String
  currentSlide: Int!
  listenerList: [String]
}

type getChannelResponse {
  status: String!
  isMaster: Boolean!
  channel: Channel
}

type getChannelsByCodeResponse {
  status: String!
  channels: [Channel]
}

extend type Query {
  getChannelsByCode(channelCode: String!): getChannelsByCodeResponse
  getChannel(channelId: String!): getChannelResponse
}

extend type Mutation {
  createChannel(
    channelId: String!, 
    channelCode: String!,
    slideUrls: [String], 
    fileUrl: String,
    slideRatioList: [Float],
  ): Channel
  setCurrentSlide(channelId: String!, currentSlide: Int!): Channel
  enteredListener(channelId: String!, listenerList: [String]): Channel
  leaveListener(channelId: String!, listenerList: [String]): Channel
  updateChannelName(channelId: String!, channelName: String!): Channel
}

extend type Subscription {
  slideChanged(channelId: String!): Channel
  listenerListChanged(channelId: String, listenerList: [String]): Channel
}
`;

module.exports = typeDefs;
