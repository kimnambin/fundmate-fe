// useForm.test.ts는 전체가 주석 처리되어 있어(테스트 0개) 제외한다. 복구 시 이 항목을 제거할 것.
const testPathIgnorePatterns = ['/node_modules/', 'useForm\\.test\\.ts$'];

module.exports = {
  projects: [
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testPathIgnorePatterns,
      testEnvironmentOptions: {
        url: 'http://localhost',
        customExportConditions: [''],
      },
      testMatch: [
        '<rootDir>/src/hooks/**/*.test.ts',
        '<rootDir>/src/components/**/*.test.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          { tsconfig: '<rootDir>/tsconfig.jest.json' },
        ],
      },
      setupFilesAfterEnv: ['jest-localstorage-mock', '<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testPathIgnorePatterns,
      testMatch: [
        '<rootDir>/src/utils/**/*.test.ts',
        '<rootDir>/src/services/**/*.test.ts',
      ],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          { tsconfig: '<rootDir>/tsconfig.jest.json' },
        ],
      },
    },
    {
      displayName: 'jest-fixed-jsdom',
      testEnvironment: 'jest-fixed-jsdom',
      testPathIgnorePatterns,
      testEnvironmentOptions: {
        url: 'http://localhost',
        customExportConditions: [''],
      },
      testMatch: ['<rootDir>/src/test/*.test.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          { tsconfig: '<rootDir>/tsconfig.jest.json' },
        ],
      },
      setupFilesAfterEnv: ['jest-localstorage-mock', '<rootDir>/jest.setup.ts'],
    },
  ],
};
