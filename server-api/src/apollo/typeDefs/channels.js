const typeDefs = `
type Channel {
  channelId: String!
  master: User 
  channelName: String
  maxHeadCount: Int
  slideUrls: [String]
  fileUrl: String
  channelCode: String!
}

type CheckChannelResponse {
  status: String!
  isMaster: Boolean!
  slideUrls: [String]
  fileUrl: String
}

type CreateChannelResponse {
  status: String!
  channel: Channel
}

type getChannelsByCodeResponse {
  status: String!
  channels: [Channel]
}

extend type Query {
  checkChannel(channelId: String!): CheckChannelResponse
  getChannelsByCode(channelCode: String!): getChannelsByCodeResponse
}

extend type Mutation {
  createChannel(
    channelId: String!, 
    channelCode: String!,
    slideUrls: [String], 
    fileUrl: String,
  ): CreateChannelResponse
}
`;

module.exports = typeDefs;
