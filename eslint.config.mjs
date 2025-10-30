/**
 * ESLint Configuration (Flat Config Format)
 * 
 * This is the modern ESLint 9+ configuration format.
 * Key features:
 * - TypeScript support via typescript-eslint
 * - Prettier integration (no conflicts)
 * - Node.js globals available
 * - Recommended rules from ESLint and TypeScript ESLint
 */

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  // Ignore build and coverage directories
  {
    ignores: ["dist/", "coverage/", "node_modules/"]
  },
  
  // Apply to TypeScript files in src/
  {
    files: ["src/**/*.ts"]
  },
  
  // Node.js global variables
  {
    languageOptions: {
      globals: globals.node
    }
  },
  
  // ESLint recommended rules
  pluginJs.configs.recommended,
  
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  
  // Custom rule overrides
  {
    rules: {
      // Allow unused variables that start with underscore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      
      // Prefer const over let when possible
      "prefer-const": "error",
      
      // Require === instead of ==
      "eqeqeq": ["error", "always"],
      
      // Disallow console.log in production code (warning only)
      "no-console": "warn"
    }
  },
  
  // Prettier integration - MUST BE LAST!
  // This disables ESLint rules that conflict with Prettier
  // and runs Prettier as an ESLint rule
  eslintPluginPrettierRecommended
];
