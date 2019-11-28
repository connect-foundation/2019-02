const typeDefs = `
type History {
  user: User
  channel: Channel!
  updatedAt: String!
}

extend type Query {
  histories: [History]
}
`;

module.exports = typeDefs;
