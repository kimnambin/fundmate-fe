module.exports = {
  projects: [
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testEnvironmentOptions: {
        url: 'http://localhost',
        customExportConditions: [''],
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
    {
      displayName: 'jest-fixed-jsdom',
      testEnvironment: 'jest-fixed-jsdom',
      testEnvironmentOptions: {
        url: 'http://localhost',
        customExportConditions: [''],
      },
      testMatch: ['<rootDir>/src/test/*.test.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      setupFilesAfterEnv: ['jest-localstorage-mock', '<rootDir>/jest.setup.ts'],
    },
  ],
};
