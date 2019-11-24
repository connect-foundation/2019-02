const { GraphQLScalarType } = require('graphql');

const ScalarDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Custom Scalar Type',
  serialize(value) {
    return Date.parse(value);
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return new Date(ast.value);
  },
});

const resolvers = {
  Date: ScalarDate,
};

module.exports = resolvers;
