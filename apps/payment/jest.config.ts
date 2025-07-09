module.exports = {
  projects: [
    {
      displayName: 'jsdom',
      // testEnvironment: 'jsdom',
      testEnvironment: 'jest-environment-jsdom',
      testEnvironmentOptions: {
        url: 'http://localhost',
      },
      testMatch: [
        '<rootDir>/src/hooks/**/*.test.ts',
        '<rootDir>/src/components/**/*.test.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      setupFilesAfterEnv: ['jest-localstorage-mock', '<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/src/utils/**/*.test.ts',
        '<rootDir>/src/services/**/*.test.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
    },
  ],
};
