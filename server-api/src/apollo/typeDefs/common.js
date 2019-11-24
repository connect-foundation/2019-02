const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  Dummy: String
}
`;

module.exports = typeDefs;
