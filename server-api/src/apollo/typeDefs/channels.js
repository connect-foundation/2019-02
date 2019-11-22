const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Channel {
  channelId: String!
  channelName: String
  maxHeadCount: Int
}

type CreateChannelResponse {
  status: String!
}

type Mutation {
  createChannel(channelId: String!): CreateChannelResponse
}
`;

module.exports = typeDefs;
