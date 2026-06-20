/** @type {import('jest').Config} */
module.exports = {
    clearMocks: true,
    collectCoverageFrom: [
        'resources/js/**/*.{ts,tsx}',
        '!resources/js/**/*.d.ts',
        '!resources/js/**/*.test.{ts,tsx}',
        '!resources/js/**/*.spec.{ts,tsx}',
        '!resources/js/actions/**',
        '!resources/js/routes/**',
        '!resources/js/wayfinder/**',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/js/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|jpg|jpeg|png|svg|webp|avif)$':
            '<rootDir>/resources/js/__mocks__/fileMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/resources/js/setupTests.ts'],
    passWithNoTests: true,
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/resources/js/**/*.test.{ts,tsx}',
        '<rootDir>/resources/js/**/*.spec.{ts,tsx}',
    ],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'babel-jest',
            { configFile: './babel.config.cjs' },
        ],
    },
};
