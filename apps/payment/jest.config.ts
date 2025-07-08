// jest.config.js (CommonJS 형태 추천)
module.exports = {
  projects: [
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/src/hooks/**/*.test.ts',
        '<rootDir>/src/components/**/*.test.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // jsdom 환경용 셋업
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
