const typeDefs = `
type Channel {
  channelId: String!
  master: User 
  channelName: String
  maxHeadCount: Int
}

type CreateChannelResponse {
  status: String!
  channel: Channel
}

extend type Mutation {
  createChannel(channelId: String!): CreateChannelResponse
}
`;

module.exports = typeDefs;
