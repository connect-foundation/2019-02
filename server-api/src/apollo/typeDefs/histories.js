const typeDefs = `
type History {
  userId: String!
  histories: [Histories]
}

type Histories {
  channelId: String!
  updatedAt: String!
}

extend type Query {
  histories: [Histories]
}
`;

module.exports = typeDefs;
