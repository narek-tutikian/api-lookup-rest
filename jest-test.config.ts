/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.test');

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  testPathIgnorePatterns: [
    '<rootDir>/build/*',
    '<rootDir>/src/test/api-test-cases/*',
  ],
  maxWorkers: '50%',
  testTimeout: 10000,
  collectCoverage: false,
  collectCoverageFrom: ['./src/**', '!./**/*.json', '!./src/templates/**/*.js'],
  coverageThreshold: {
    global: {
      branch: 90,
      funcs: 90,
    },
  },
};
