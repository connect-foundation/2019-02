const typeDefs = `
type Chat {
  id: String
  channelId: String
  author: User
  message: String
  likes: [String]
  createdAt: Date
}

extend type Mutation {
  addChat(channelId: String!, message: String!): Chat
  likeChat(chatId: String!): Chat
}

extend type Subscription {
  chatChanged(channelId: String!): Chat
}
`;

module.exports = typeDefs;
