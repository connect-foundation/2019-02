const typeDefs = `
type Emoji {
  channelId: String
  type: String
  positionX: Int
  positionY: Int
}

extend type Mutation {
  broadcastEmoji(channelId: String!, type: String, positionX: Int, positionY: Int): Emoji
}

extend type Subscription {
  startFlyingEmoji(channelId: String!): Emoji
}
`;

module.exports = typeDefs;
