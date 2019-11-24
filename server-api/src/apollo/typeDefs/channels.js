const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Channel {
  channelId: String!
  channelName: String
  maxHeadCount: Int
}

type CreateChannelResponse {
  status: String!
  channel: Channel
}

type Mutation {
  createChannel(channelId: String!): CreateChannelResponse
}
`;

module.exports = typeDefs;
