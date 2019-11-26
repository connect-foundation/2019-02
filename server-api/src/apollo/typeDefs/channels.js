const typeDefs = `
type Channel {
  channelId: String!
  master: User 
  channelName: String
  maxHeadCount: Int
  slideUrls: [String]
  fileUrl: String
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

extend type Query {
  checkChannel(channelId: String!): CheckChannelResponse
}

extend type Mutation {
  createChannel(
    channelId: String!, 
    slideUrls: [String], 
    fileUrl: String,
  ): CreateChannelResponse
}
`;

module.exports = typeDefs;
