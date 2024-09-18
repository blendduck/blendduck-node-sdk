
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transformIgnorePatterns: ["/node_modules/(?!nanoid/)"],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@blendduck/node-sdk$': '<rootDir>/src/index.ts',
    '^@blendduck/node-sdk/(.*)$': '<rootDir>/src/$1',
  },
  // modulePathIgnorePatterns: [
  //   '<rootDir>/ecosystem-tests/',
  //   '<rootDir>/dist/',
  //   '<rootDir>/deno/',
  //   '<rootDir>/deno_tests/',
  // ],
  // testPathIgnorePatterns: ['scripts'],
};

export default config;