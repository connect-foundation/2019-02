const typeDefs = `
type History {
  channel: Channel
  updatedAt: Date
}

extend type Query {
  getHistories: [History]
}
`;

module.exports = typeDefs;
