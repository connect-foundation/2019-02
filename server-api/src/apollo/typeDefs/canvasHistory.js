const typeDefs = `
type CanvasHistory {
  channelId: String!
  page: Int!
  history: [Coordinate]
  toolOptions: ToolOptions
}

type ToolOptions {
  lineWidth: Int
  lineCap: String,
  lineColor: String,
}

input ToolOptionsInput {
  lineWidth: Int
  lineCap: String,
  lineColor: String,
}

extend type Query {
  getCanvasHistory(
    channelId: String!, 
    page: Int!,
    toolOptions: ToolOptionsInput,
  ): CanvasHistory
}

extend type Mutation {
  addCanvasHistory(
    channelId: String!, 
    page: Int!, 
    history: [Coordinate],
    toolOptions: ToolOptionsInput,
  ): CanvasHistory
}
`;

module.exports = typeDefs;
