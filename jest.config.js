const { argv } = require('yargs')

const jestConfig = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.test.{ts, tsx}',
        '!src/**/*.d.ts',
        '!src/**/types.ts',
        '!**/node_modules/**'
    ],
    coverageDirectory: '.temp',
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx'
    ],
    setupFiles: [
        './_scripts_/testHook/test-setup.ts'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/'
    ],
    transform: {
        '.(js|jsx)': '<rootDir>/node_modules/babel-jest',
        '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",    
}

if (argv.coverage) {
    jestConfig.testResultsProcessor = './node_modules/jest-html-reporter'
}

module.exports = jestConfig
