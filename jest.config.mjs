/**
 * Jest Configuration for TypeScript Testing
 * 
 * This configuration uses ts-jest to run TypeScript tests directly
 * without pre-compilation, providing type checking during tests.
 */

export default {
  // Use ts-jest preset for TypeScript support
  preset: "ts-jest/presets/default-esm",
  
  // Use Node.js test environment (not browser/jsdom)
  testEnvironment: "node",
  
  // Root directory for tests
  roots: ["<rootDir>/src"],
  
  // Pattern to find test files
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/*.test.ts"
  ],
  
  // Transform TypeScript files with ts-jest
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  
  // Module name mapping (if needed for path aliases)
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  
  // File extensions to consider
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  
  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/__tests__/**",
    "!src/**/*.d.ts"
  ],
  
  // Coverage thresholds (80% is realistic and achievable)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Coverage output directory
  coverageDirectory: "coverage",
  
  // Coverage reporters
  coverageReporters: ["text", "lcov", "html"],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true
};
