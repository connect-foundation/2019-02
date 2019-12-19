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

const checkCoordinateTypeValidation = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('Coordinate type은 1차원 배열이어야 합니다.');
  } else if (value.length !== 2 && value.length !== 0) {
    throw new Error('Coordinate type은 x, y 좌표값을 모두 갖고 있거나, 아예 값이 없어야 합니다.');
  }
};
const ScalarCoordinate = new GraphQLScalarType({
  name: 'Coordinate',
  description: 'Coordinate Custom Scalar Type',
  serialize(value) {
    checkCoordinateTypeValidation(value);
    return value;
  },
  parseValue(value) {
    checkCoordinateTypeValidation(value);
    return value;
  },
  parseLiteral(ast) {
    checkCoordinateTypeValidation(ast.value);
    return ast.value;
  },
});

const resolvers = {
  Date: ScalarDate,
  Coordinate: ScalarCoordinate,
};

module.exports = resolvers;
