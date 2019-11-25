const typeDefs = `
type Channel {
  channelId: String!
  master: User 
  channelName: String
  maxHeadCount: Int
}

type CheckChannelResponse {
  status: String!
  isMaster: Boolean!
}

type CreateChannelResponse {
  status: String!
  channel: Channel
}

extend type Query {
  checkChannel(channelId: String!): CheckChannelResponse
}

extend type Mutation {
  createChannel(channelId: String!): CreateChannelResponse
}
`;

module.exports = typeDefs;
