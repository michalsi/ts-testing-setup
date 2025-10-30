# Configuration Guide - Deep Dive

> **Comprehensive explanation of every configuration decision in this project**

This guide explains what each configuration file does, why it's configured a certain way, and what alternatives exist. Use this as a learning resource to understand modern TypeScript testing setup.

---

## Table of Contents
- [package.json](#packagejson)
- [tsconfig.json](#tsconfigjson)
- [jest.config.mjs](#jestconfigmjs)
- [eslint.config.mjs](#eslintconfigmjs)
- [.prettierrc](#prettierrc)
- [.gitignore](#gitignore)
- [nodemon.json](#nodemonjson)
- [Integration Between Tools](#integration-between-tools)
- [Common Pitfalls](#common-pitfalls)

---

## package.json

### Purpose
Defines project metadata, dependencies, and npm scripts.

### Key Sections

#### `"type": "module"`
```json
"type": "module"
```

**What it does:** Enables ES modules (import/export) by default in Node.js.

**Why:** Modern JavaScript standard. TypeScript outputs ES modules when configured for modern targets.

**Alternative:** CommonJS (require/exports) - older, but still widely used.

---

#### Scripts

```json
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
  "test:coverage": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix",
  "format": "prettier --write \"src/**/*.ts\"",
  "format:check": "prettier --check \"src/**/*.ts\"",
  "type-check": "tsc --noEmit",
  "build": "tsc",
  "dev": "nodemon"
}
```

**Test Scripts:**
- `--experimental-vm-modules`: Required for Jest to work with ES modules in Node.js
- **Why needed:** Jest's ESM support is still experimental in Node.js
- **Alternative:** Use CommonJS (not recommended for new projects)

**Lint Scripts:**
- `lint`: Check for issues
- `lint:fix`: Auto-fix issues where possible
- **Pattern:** `src/**/*.ts` targets all TypeScript files in src/

**Format Scripts:**
- `format`: Auto-format all files
- `format:check`: Check formatting without changing files (useful in CI)

**TypeScript Scripts:**
- `type-check`: Check types without generating files (fast)
- `build`: Compile TypeScript to JavaScript in dist/

---

#### DevDependencies

```json
"devDependencies": {
  "@eslint/js": "^9.13.0",
  "@tsconfig/node20": "^20.1.4",
  "@types/jest": "^29.5.14",
  "@types/node": "^20.17.1",
  "eslint": "^9.13.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.2.1",
  "globals": "^15.11.0",
  "jest": "^29.7.0",
  "nodemon": "^3.1.7",
  "prettier": "^3.3.3",
  "ts-jest": "^29.2.5",
  "ts-node": "^10.9.2",
  "typescript": "^5.6.3",
  "typescript-eslint": "^8.11.0"
}
```

**Core Tools:**
- `typescript`: The TypeScript compiler
- `@types/node`: Type definitions for Node.js APIs
- `@tsconfig/node20`: Shared TypeScript config for Node.js 20

**Testing:**
- `jest`: Testing framework
- `ts-jest`: Allows Jest to run TypeScript tests directly
- `@types/jest`: Type definitions for Jest APIs

**Linting:**
- `eslint`: Core linting tool
- `@eslint/js`: ESLint's JavaScript recommended rules
- `typescript-eslint`: TypeScript support for ESLint (parser + rules)
- `globals`: Global variables definitions (Node.js, browser, etc.)

**Formatting:**
- `prettier`: Code formatter
- `eslint-config-prettier`: Disables ESLint rules that conflict with Prettier
- `eslint-plugin-prettier`: Runs Prettier as an ESLint rule

**Development:**
- `nodemon`: Auto-reload during development
- `ts-node`: Run TypeScript files directly (used by nodemon)

---

## tsconfig.json

### Purpose
Configures the TypeScript compiler (tsc).

### Full Configuration

```json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/__tests__/**"]
}
```

### Key Options Explained

#### `"extends": "@tsconfig/node20/tsconfig.json"`
**What it does:** Inherits settings optimized for Node.js 20.

**Why:** TypeScript team maintains these configs. They set:
- `module`: "Node16" (ESM + CommonJS interop)
- `target`: "ES2022"
- `lib`: ["ES2022"]
- And other Node.js-specific options

**Alternative:** Manual configuration (verbose, error-prone).

---

#### `"outDir": "./dist"` and `"rootDir": "./src"`
**What it does:** 
- Source files in `src/`
- Compiled JavaScript in `dist/`

**Why:** Clean separation. `dist/` can be gitignored and rebuilt anytime.

**Alternative:** Compile in place (messy, .ts and .js files mixed).

---

#### `"strict": true"`
**What it does:** Enables all strict type checking options:
- `strictNullChecks`: Can't assign null/undefined without explicit types
- `strictFunctionTypes`: Stricter function parameter checking
- `strictBindCallApply`: Type check bind/call/apply
- `strictPropertyInitialization`: Class properties must be initialized
- And more...

**Why:** Catches bugs at compile time. Makes TypeScript actually useful.

**Trade-off:** More verbose code, but much safer.

**Example:**
```typescript
// Without strict mode:
let name: string;
console.log(name.toUpperCase()); // Compiles, runtime error!

// With strict mode:
let name: string; // Error: Variable 'name' is used before assigned
```

---

#### `"noUnusedLocals": true` and `"noUnusedParameters": true"`
**What it does:** Error on unused variables and parameters.

**Why:** Keeps code clean, catches mistakes.

**Exception:** Prefix with `_` to ignore (see ESLint config).

---

#### `"noImplicitReturns": true"`
**What it does:** Error if function doesn't return in all code paths.

**Why:** Prevents forgetting to return a value.

**Example:**
```typescript
// Error with noImplicitReturns
function getStatus(isActive: boolean): string {
  if (isActive) {
    return "active";
  }
  // Error: Not all code paths return a value
}
```

---

#### `"esModuleInterop": true"`
**What it does:** Better interop between ES modules and CommonJS.

**Why:** Allows `import express from "express"` instead of `import * as express`.

**Recommendation:** Always enable for modern projects.

---

#### `"skipLibCheck": true"`
**What it does:** Skip type checking of declaration files (.d.ts).

**Why:** Faster compilation. Avoids errors in third-party type definitions.

**Trade-off:** Might miss some type errors in dependencies (rare).

---

#### `"declaration": true` and `"declarationMap": true"`
**What it does:** Generate .d.ts files (type definitions) and source maps.

**Why:** If you publish a library, consumers get type information.

**When to disable:** For applications (not libraries), can disable to speed up builds.

---

#### `"sourceMap": true"`
**What it does:** Generate .js.map files for debugging.

**Why:** Debugger shows TypeScript source, not compiled JavaScript.

**When to disable:** Production builds (slightly smaller bundle).

---

#### `"include": ["src/**/*"]`
**What it does:** Only compile files in src/.

**Why:** Explicit about what to compile.

---

#### `"exclude": ["**/*.test.ts", "**/__tests__/**"]`
**What it does:** Don't include tests in build output.

**Why:** Tests aren't shipped to production. Smaller dist/ folder.

**Note:** Tests are still type-checked when you run `npm run type-check`.

---

## jest.config.mjs

### Purpose
Configures Jest test runner for TypeScript.

### Full Configuration

```javascript
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }]
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/__tests__/**",
    "!src/**/*.d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  verbose: true,
  clearMocks: true,
  restoreMocks: true
};
```

### Key Options Explained

#### `preset: "ts-jest/presets/default-esm"`
**What it does:** Preconfigured settings for TypeScript + ESM.

**Why:** Handles TypeScript compilation and ES modules automatically.

**Alternative:** `"ts-jest"` for CommonJS, or manual transformer configuration.

---

#### `testEnvironment: "node"`
**What it does:** Run tests in Node.js environment (not browser).

**Why:** We're testing Node.js applications, not frontend code.

**Alternative:** `"jsdom"` for testing React/Vue/browser code.

---

#### `roots: ["<rootDir>/src"]`
**What it does:** Jest only looks for tests in src/.

**Why:** Faster test discovery. Avoids scanning node_modules/ etc.

---

#### `testMatch: ["**/__tests__/**/*.test.ts"]`
**What it does:** Files matching this pattern are tests.

**Why:** Clear convention. All test files end with `.test.ts` and are in `__tests__/` directories.

**Alternative:** `"**/*.spec.ts"` or co-located tests (next to source files).

---

#### `transform` and `moduleNameMapper`
**What it does:** Handle TypeScript and ES module imports.

**Why:** TypeScript needs compilation, ES modules need special handling in Jest.

**Details:**
- `transform`: Use ts-jest to compile .ts files
- `moduleNameMapper`: Resolve `.js` imports to `.ts` files (ESM quirk)

---

#### `collectCoverageFrom`
**What it does:** Which files to include in coverage report.

**Configuration:**
- Include: All .ts files in src/
- Exclude: Test files, type definitions

**Why:** Only measure coverage of production code, not tests.

---

#### `coverageThreshold`
**What it does:** Minimum coverage required for tests to pass.

**80% threshold:**
- **Realistic:** Achievable without excessive effort
- **Meaningful:** Catches most untested code
- **Not dogmatic:** 100% often has diminishing returns

**Metrics:**
- `branches`: If/else, switch cases, ternaries
- `functions`: All functions executed
- `lines`: All lines executed
- `statements`: All statements executed

**Trade-offs:**
- Too low (e.g., 50%): Not very useful
- Too high (e.g., 100%): Unrealistic, focus shifts to coverage gaming

---

#### `coverageReporters: ["text", "lcov", "html"]`
**What it does:** Output formats for coverage reports.

- `text`: Terminal output (quick overview)
- `lcov`: Machine-readable format (for CI tools)
- `html`: Visual report in `coverage/` directory (open index.html)

---

#### `verbose: true`
**What it does:** Show individual test results, not just summary.

**Why:** Easier to see which tests pass/fail.

---

#### `clearMocks: true` and `restoreMocks: true`
**What it does:** Reset mocks between tests.

**Why:** Tests don't interfere with each other.

**Example:**
```typescript
test("first test", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("second test", () => {
  // Without clearMocks, mockFn might still show 1 call
  // With clearMocks, it's reset to 0
});
```

---

## eslint.config.mjs

### Purpose
Configure ESLint for code quality and style checking.

### Full Configuration

```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist/", "coverage/", "node_modules/"] },
  { files: ["src/**/*.ts"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "no-console": "warn"
    }
  },
  eslintPluginPrettierRecommended // MUST BE LAST!
];
```

### Key Concepts

#### Flat Config Format (ESLint 9+)
**What it is:** New configuration format. Replaces `.eslintrc.js/json/yaml`.

**Structure:**
```javascript
export default [
  { /* config object 1 */ },
  { /* config object 2 */ },
  // ...
];
```

**Why:** More intuitive, better composability, JavaScript native.

**Migration:** Old configs still work in ESLint 8, but deprecated.

---

#### `ignores: ["dist/", "coverage/", "node_modules/"]`
**What it does:** Don't lint these directories.

**Why:** 
- `dist/`: Generated code
- `coverage/`: Generated reports
- `node_modules/`: Third-party code

---

#### `files: ["src/**/*.ts"]`
**What it does:** Only lint TypeScript files in src/.

**Why:** Explicit scope. Avoids linting configs or scripts.

---

#### `languageOptions: { globals: globals.node }`
**What it does:** Make Node.js globals available without errors.

**Examples:** `process`, `__dirname`, `Buffer`, `console`, etc.

**Why:** Without this, ESLint errors on `process.env`.

---

#### `pluginJs.configs.recommended`
**What it does:** ESLint's recommended rules for JavaScript.

**Examples:**
- No unused variables
- No unreachable code
- No duplicate cases in switch
- And 50+ more rules

---

#### `...tseslint.configs.recommended`
**What it does:** TypeScript ESLint's recommended rules.

**Examples:**
- No explicit `any` types (prefer unknown)
- Prefer TypeScript features over JavaScript
- Type-aware linting rules

**Note:** `...` spreads array of configs (multiple config objects).

---

#### Custom Rules

```javascript
{
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_"
    }]
  }
}
```

**What it does:** Allow unused variables/parameters starting with `_`.

**Why:** Common in Express:
```typescript
app.get("/", (_req, res) => {
  res.send("Hello"); // _req is intentionally unused
});
```

---

#### `eslintPluginPrettierRecommended` - CRITICAL!

**What it does:**
1. Runs Prettier as an ESLint rule
2. Disables ESLint rules that conflict with Prettier

**Why last:** Must override previous configs to disable conflicting rules.

**Common mistake:** Putting this earlier causes conflicts.

**Example conflict:**
- ESLint rule: `semi: ["error", "never"]` (no semicolons)
- Prettier: `semi: true` (semicolons required)
- If Prettier config is not last, both rules are active → errors everywhere!

---

## .prettierrc

### Purpose
Configure Prettier code formatter.

### Full Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto",
  "arrowParens": "always"
}
```

### Options Explained

#### `"semi": true`
**What it does:** Add semicolons at end of statements.

**Why:** JavaScript standard. Prevents rare edge case bugs.

**Alternative:** `false` (no semicolons, like in some style guides).

---

#### `"trailingComma": "es5"`
**What it does:** Add trailing comma where valid in ES5 (arrays, objects).

**Why:** Cleaner git diffs when adding items.

**Example:**
```javascript
const obj = {
  a: 1,
  b: 2, // Trailing comma
};
```

**Alternatives:**
- `"none"`: No trailing commas
- `"all"`: Even in function parameters (requires ES2017+)

---

#### `"singleQuote": false`
**What it does:** Use double quotes for strings.

**Why:** JavaScript standard. JSON compatibility.

**Alternative:** `true` (single quotes, popular in some communities).

---

#### `"printWidth": 80`
**What it does:** Wrap lines longer than 80 characters.

**Why:** Readability. Fits in most screens. Historical convention.

**Alternative:** 100 or 120 for wider monitors.

---

#### `"tabWidth": 2` and `"useTabs": false`
**What it does:** Indent with 2 spaces.

**Why:** JavaScript community standard.

**Alternative:** 4 spaces or tabs (less common).

---

#### `"endOfLine": "auto"`
**What it does:** Use OS-native line endings (LF on Mac/Linux, CRLF on Windows).

**Why:** Prevents cross-platform conflicts.

**Alternative:** `"lf"` forces Unix-style (requires Git config: `core.autocrlf = input`).

---

#### `"arrowParens": "always"`
**What it does:** Always use parentheses around arrow function parameters.

**Example:**
```javascript
// With "always"
const fn = (x) => x * 2;

// With "avoid"
const fn = x => x * 2;
```

**Why:** Consistency. Easier to add parameters later.

---

## .gitignore

### Purpose
Tell Git which files to ignore (not track).

### Key Sections

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/
*.tsbuildinfo

# Coverage
coverage/
*.lcov

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Environment
.env
```

**Why ignore:**
- `node_modules/`: Huge, reinstalled with `npm install`
- `dist/`: Generated, rebuilt with `npm run build`
- `coverage/`: Generated, rebuilt with `npm run test:coverage`
- IDE/OS files: Personal, not project-related
- `.env`: Contains secrets, should never be committed!

---

## nodemon.json

### Purpose
Configure nodemon for auto-reload during development.

### Configuration

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "npm run build && node dist/index.js",
  "ignore": ["src/**/*.test.ts", "src/__tests__/**"]
}
```

### Options Explained

#### `"watch": ["src"]`
**What it does:** Watch src/ directory for changes.

**Why:** Only source files trigger reload, not dist/ or node_modules/.

---

#### `"ext": "ts"`
**What it does:** Only watch .ts files.

**Why:** Avoid reloading on .log, .md, etc.

---

#### `"exec": "npm run build && node dist/index.js"`
**What it does:** On file change:
1. Rebuild TypeScript
2. Run compiled JavaScript

**Alternative:** Use ts-node directly (slower but no build step).

---

#### `"ignore": ["**/*.test.ts"]`
**What it does:** Don't reload when test files change.

**Why:** Tests don't affect running application.

---

## Integration Between Tools

### How Everything Works Together

```
Source Code (.ts)
       ↓
TypeScript (tsconfig.json)
       ↓ (type checking)
ESLint (eslint.config.mjs)
       ↓ (linting)
Prettier (via ESLint plugin)
       ↓ (formatting)
Tests (Jest + ts-jest)
       ↓
Build (tsc → dist/)
       ↓
Run (node dist/index.js)
```

### Critical Integration Points

#### 1. TypeScript + Jest (via ts-jest)
- Jest can't run TypeScript directly
- ts-jest compiles on-the-fly
- Uses tsconfig.json settings

#### 2. ESLint + Prettier
- ESLint checks code quality
- Prettier formats code
- Integration prevents conflicts
- **CRITICAL:** Prettier config must be last in ESLint config!

#### 3. TypeScript + ESLint (via typescript-eslint)
- ESLint needs TypeScript parser
- typescript-eslint provides parser and type-aware rules
- Uses tsconfig.json for type information

---

## Common Pitfalls

### 1. ESLint and Prettier Fight
**Symptom:** Code formatted by Prettier fails ESLint.

**Cause:** Prettier config not last in ESLint config.

**Solution:**
```javascript
export default [
  // ... other configs
  eslintPluginPrettierRecommended // MUST BE LAST!
];
```

---

### 2. Tests Not Found
**Symptom:** `npm test` says "No tests found".

**Cause:** Test files don't match `testMatch` pattern.

**Solution:** Ensure tests end with `.test.ts` and are in `__tests__/` or match pattern in `jest.config.mjs`.

---

### 3. Module Resolution Errors
**Symptom:** `Cannot find module` errors in tests.

**Cause:** ES modules need special handling in Jest.

**Solution:** Already configured in `jest.config.mjs` with `moduleNameMapper`.

---

### 4. Coverage Too Low
**Symptom:** Tests pass but coverage fails.

**Cause:** Not all code is tested, or thresholds too high.

**Solution:** 
- Write more tests, or
- Adjust `coverageThreshold` in `jest.config.mjs`

---

### 5. Slow Tests
**Symptom:** Tests take a long time to run.

**Cause:** ts-jest compiles on-the-fly (slower than pre-compiled).

**Solutions:**
- Use `--maxWorkers=4` to limit parallel tests
- Use `--onlyChanged` to test only modified files
- Consider pre-compiling for large projects

---

### 6. Type Errors in Tests
**Symptom:** TypeScript errors when importing in tests.

**Cause:** Tests excluded from tsconfig.json.

**Solution:** Tests are intentionally excluded from build, but still type-checked by:
- IDEs (VS Code, WebStorm)
- `npm run type-check`
- Jest (via ts-jest)

---

### 7. `__dirname` Not Defined (ESM)
**Symptom:** `__dirname is not defined` error.

**Cause:** ES modules don't have `__dirname`.

**Solution:**
```typescript
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## Customization Guide

### Changing Coverage Thresholds

In `jest.config.mjs`:
```javascript
coverageThreshold: {
  global: {
    branches: 70,    // Lower if struggling to reach 80%
    functions: 70,
    lines: 70,
    statements: 70
  }
}
```

---

### Adding More ESLint Rules

In `eslint.config.mjs`:
```javascript
{
  rules: {
    "no-console": "error",  // Disallow console.log
    "prefer-arrow-callback": "error",  // Prefer arrow functions
    "@typescript-eslint/explicit-function-return-type": "warn"  // Require return types
  }
}
```

---

### Changing Prettier Style

In `.prettierrc`:
```json
{
  "semi": false,         // No semicolons
  "singleQuote": true,   // Single quotes
  "printWidth": 100      // Longer lines
}
```

**Remember:** Update team expectations if you change style!

---

## Summary

This configuration provides:
- ✅ Modern TypeScript setup
- ✅ Type-safe testing with Jest
- ✅ Code quality with ESLint
- ✅ Consistent formatting with Prettier
- ✅ No conflicts between tools
- ✅ Comprehensive coverage reporting
- ✅ Developer-friendly scripts

**Key Principles:**
1. Use community-maintained configs (less maintenance)
2. Strict type checking (catch bugs early)
3. Realistic coverage goals (80%)
4. Prettier last in ESLint (avoid conflicts)
5. Separate source and build (clean structure)

**Next Steps:**
- Explore test examples in `src/__tests__/`
- Experiment with configurations
- Copy to your own projects
- Build something awesome!

---

**Questions?** Review this guide, check official docs, or experiment!
