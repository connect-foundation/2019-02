const typeDefs = `
type CanvasHistory {
  id: String!
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
  resetCanvasHistory(
    channelId: String!, 
    page: Int!
  ): CanvasHistory 
}
`;

module.exports = typeDefs;
