const typeDefs = `
type Chat {
  id: String
  channelId: String
  author: User
  message: String
  createdAt: Date
}

extend type Mutation {
  addChat(channelId: String!, message: String!): Chat
}

extend type Subscription {
  chatAdded(channelId: String!): Chat
}
`;

module.exports = typeDefs;
