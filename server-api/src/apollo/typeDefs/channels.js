const typeDefs = `
type Channel {
  id: String
  channelId: String
  master: User 
  slideUrls: [String]
  slideRatioList: [Float]
  fileUrl: String
  channelCode: String
  channelStatus: String
  currentSlide: Int
  listenerList: [String]
  channelOptions: ChannelOptions
}
type ChannelOptions {
  id: String,
  channelName: String
  maxHeadCount: Int
  expiredAt: Date
  anonymousChat: Boolean
  emojiEffect: Boolean
}
input ChannelOptionsInput {
  channelName: String
  maxHeadCount: Int
  expiredAt: Date
  anonymousChat: Boolean
  emojiEffect: Boolean
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
  setChannelStatus(channelId: String!, status: String!): Channel
  updateChannelOptions(channelId: String!, channelOptions: ChannelOptionsInput): ChannelOptions
  enteredListener(channelId: String!, listenerList: [String]): Channel
  leaveListener(channelId: String!, listenerList: [String]): Channel
}
extend type Subscription {
  slideChanged(channelId: String!): Channel
  channelStatusChanged(channelId: String!): Channel
  optionChanged(channelId: String!): ChannelOptions
  listenerListChanged(channelId: String, listenerList: [String]): Channel
}
`;

module.exports = typeDefs;
