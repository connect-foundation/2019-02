const typeDefs = `
type Chat {
  id: String
  channelId: String
  author: User
  message: String
  likes: [String]
  isQuestion: Boolean
  createdAt: Date
}

extend type Query {
  getChatLogs(channelId: String!): [Chat]
}

extend type Mutation {
  addChat(channelId: String!, message: String!, isQuestion: Boolean!): Chat
  likeChat(chatId: String!): Chat
}

extend type Subscription {
  chatChanged(channelId: String!): Chat
}
`;

module.exports = typeDefs;
