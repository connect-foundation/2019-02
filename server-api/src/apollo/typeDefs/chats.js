const typeDefs = `
type Chat {
  channel: Channel
  author: User
  message: String
}

extend type Mutation {
  addChat(channelId: String!, message: String!): Chat
}

extend type Subscription {
  chatAdded(channelId: String!): Chat
}
`;

module.exports = typeDefs;
