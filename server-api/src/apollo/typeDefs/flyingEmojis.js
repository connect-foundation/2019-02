const typeDefs = `
type Emoji {
  type: String
  channelId: String
}

extend type Subscription {
  startFlyingEmoji(type: String!, channelId: String!) : Emoji
}
`;

module.exports = typeDefs;
