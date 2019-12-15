const typeDefs = `
type Emoji {
  channelId: String
  type: String
}

extend type Mutation {
  broadcastEmoji(channelId: String!, type: String): Emoji
}

extend type Subscription {
  startFlyingEmoji(channelId: String!): Emoji
}
`;

module.exports = typeDefs;
