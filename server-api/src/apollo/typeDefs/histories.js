const typeDefs = `
type History {
  channel: Channel
  updatedAt: Date
}

type AddHistoryResponse {
  status: String!
  history: History
}

extend type Mutation {
  addHistory(channelId: String!): AddHistoryResponse
}

extend type Query {
  getHistories: [History]
}
`;

module.exports = typeDefs;
