module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  roots: [
    '<rootDir>',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
