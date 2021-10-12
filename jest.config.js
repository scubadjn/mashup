module.exports = {
  'testEnvironment': 'node',
   'roots': [
    '<rootDir>/src',
  ],
  'transform': {
    '^.+\\.ts?$': 'ts-jest',
  },
  'moduleNameMapper': {
    '@server': '<rootDir>/src@types',
    '@server': '<rootDir>/src/server',
  },
};