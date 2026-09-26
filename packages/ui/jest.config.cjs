module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    '^.+\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
};
